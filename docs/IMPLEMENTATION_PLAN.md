# Implementation Plan: API & Database Connection

**Status:** Pending  
**Priority:** High  
**Created:** 13 Feb 2026

---

## Overview

Connect the RentFlow UI to real database operations through API routes. This plan covers Cars API, Bookings API, Authentication Middleware, and UI integration.

---

## Phase 1: Server Infrastructure

### 1.1 Create Server Utilities

**File:** `src/lib/api-utils.ts`

```typescript
// Response helpers for API routes
import { NextResponse } from "next/server";

export function apiResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function unauthorized() {
  return apiError("Unauthorized", 401);
}

export function forbidden() {
  return apiError("Forbidden", 403);
}

export function notFound(message = "Not found") {
  return apiError(message, 404);
}
```

**File:** `src/lib/auth-middleware.ts`

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    return { error: "unauthorized", session: null };
  }
  return { error: null, session };
}

export async function requireAdmin() {
  const result = await requireAuth();
  if (result.error) return result;
  
  if (result.session?.user?.role !== "admin") {
    return { error: "forbidden", session: null };
  }
  return result;
}
```

### 1.2 Auth Middleware for Pages

**File:** `src/middleware.ts`

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/fleet", "/tracking", "/bookings", "/my-bookings", "/booking"];
const adminPaths = ["/dashboard", "/fleet", "/tracking", "/bookings"];
const authPaths = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("better-auth.session_token");

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // Redirect to login if accessing protected route without token
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to home if accessing auth pages with token
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

---

## Phase 2: Cars API (Admin)

### 2.1 List & Create Cars

**File:** `src/app/api/cars/route.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/db";
import { cars } from "@/db/schema";
import { apiResponse, apiError, requireAdmin } from "@/lib/api-utils";
import { ilike, or } from "drizzle-orm";

// GET /api/cars - List all cars
export async function GET(request: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error === "unauthorized" ? apiError("Unauthorized", 401) : apiError("Forbidden", 403);

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const status = searchParams.get("status");
  const type = searchParams.get("type");

  try {
    const results = await db.query.cars.findMany({
      where: (cars, { and, eq }) => {
        const conditions = [];
        if (status) conditions.push(eq(cars.status, status as any));
        if (type) conditions.push(eq(cars.type, type));
        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    return apiResponse(results);
  } catch (error) {
    return apiError("Failed to fetch cars", 500);
  }
}

// POST /api/cars - Create new car
export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error === "unauthorized" ? apiError("Unauthorized", 401) : apiError("Forbidden", 403);

  try {
    const body = await request.json();
    
    const result = await db.insert(cars).values({
      name: body.name,
      licensePlate: body.licensePlate,
      type: body.type,
      transmission: body.transmission,
      seats: body.seats,
      pricingPerDay: body.pricingPerDay,
      status: body.status || "available",
      imageUrl: body.imageUrl,
    }).returning();

    return apiResponse(result[0], 201);
  } catch (error) {
    return apiError("Failed to create car", 500);
  }
}
```

### 2.2 Get, Update, Delete Car

**File:** `src/app/api/cars/[id]/route.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/db";
import { cars } from "@/db/schema";
import { apiResponse, apiError, notFound } from "@/lib/api-utils";
import { eq } from "drizzle-orm";

// GET /api/cars/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const result = await db.query.cars.findFirst({
    where: eq(cars.id, parseInt(id)),
  });

  if (!result) return notFound("Car not found");
  return apiResponse(result);
}

// PUT /api/cars/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const result = await db
      .update(cars)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(cars.id, parseInt(id)))
      .returning();

    if (!result.length) return notFound("Car not found");
    return apiResponse(result[0]);
  } catch (error) {
    return apiError("Failed to update car", 500);
  }
}

// DELETE /api/cars/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const result = await db
      .delete(cars)
      .where(eq(cars.id, parseInt(id)))
      .returning();

    if (!result.length) return notFound("Car not found");
    return apiResponse({ success: true });
  } catch (error) {
    return apiError("Failed to delete car", 500);
  }
}
```

---

## Phase 3: Bookings API

### 3.1 List & Create Bookings

**File:** `src/app/api/bookings/route.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/db";
import { bookings, cars, users } from "@/db/schema";
import { apiResponse, apiError, requireAuth, requireAdmin } from "@/lib/api-utils";
import { eq, and, gte, lte } from "drizzle-orm";

// GET /api/bookings
export async function GET(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return apiError("Unauthorized", 401);

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");

  try {
    // Admin sees all, customer sees only their own
    const isAdmin = auth.session?.user?.role === "admin";
    
    const results = await db.query.bookings.findMany({
      where: (bookings, { and, eq }) => {
        const conditions = [];
        if (!isAdmin) conditions.push(eq(bookings.userId, parseInt(auth.session!.user.id)));
        if (status) conditions.push(eq(bookings.status, status as any));
        return conditions.length > 0 ? and(...conditions) : undefined;
      },
      with: {
        user: true,
        car: true,
      },
      orderBy: (bookings, { desc }) => [desc(bookings.createdAt)],
    });

    return apiResponse(results);
  } catch (error) {
    return apiError("Failed to fetch bookings", 500);
  }
}

// POST /api/bookings
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return apiError("Unauthorized", 401);

  try {
    const body = await request.json();
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    
    // Calculate days
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Get car price
    const car = await db.query.cars.findFirst({
      where: eq(cars.id, body.carId),
    });

    if (!car) return apiError("Car not found", 404);
    if (car.status !== "available") return apiError("Car is not available", 400);

    const totalPrice = (parseFloat(car.pricingPerDay) * days).toString();

    const result = await db.insert(bookings).values({
      userId: parseInt(auth.session!.user.id),
      carId: body.carId,
      startDate,
      endDate,
      totalPrice,
      notes: body.notes,
    }).returning();

    return apiResponse(result[0], 201);
  } catch (error) {
    return apiError("Failed to create booking", 500);
  }
}
```

### 3.2 Get, Update Booking

**File:** `src/app/api/bookings/[id]/route.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { apiResponse, apiError, notFound, requireAuth } from "@/lib/api-utils";
import { eq } from "drizzle-orm";

// GET /api/bookings/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.error) return apiError("Unauthorized", 401);

  const { id } = await params;

  const result = await db.query.bookings.findFirst({
    where: eq(bookings.id, parseInt(id)),
    with: {
      user: true,
      car: true,
    },
  });

  if (!result) return notFound("Booking not found");

  // Customer can only see their own booking
  if (auth.session?.user?.role !== "admin" && result.userId !== parseInt(auth.session!.user.id)) {
    return apiError("Forbidden", 403);
  }

  return apiResponse(result);
}

// PUT /api/bookings/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.error) return apiError("Unauthorized", 401);

  const { id } = await params;
  const body = await request.json();

  // Only admin can update status
  if (body.status && auth.session?.user?.role !== "admin") {
    return apiError("Forbidden", 403);
  }

  try {
    const result = await db
      .update(bookings)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, parseInt(id)))
      .returning();

    if (!result.length) return notFound("Booking not found");
    return apiResponse(result[0]);
  } catch (error) {
    return apiError("Failed to update booking", 500);
  }
}
```

### 3.3 Approve Booking

**File:** `src/app/api/bookings/[id]/approve/route.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/db";
import { bookings, cars } from "@/db/schema";
import { apiResponse, apiError, notFound, requireAdmin } from "@/lib/api-utils";
import { eq } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error === "unauthorized" ? apiError("Unauthorized", 401) : apiError("Forbidden", 403);

  const { id } = await params;

  try {
    // Get booking
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, parseInt(id)),
    });

    if (!booking) return notFound("Booking not found");
    if (booking.status !== "pending") return apiError("Booking is not pending", 400);

    // Update booking status
    const result = await db
      .update(bookings)
      .set({ status: "approved", updatedAt: new Date() })
      .where(eq(bookings.id, parseInt(id)))
      .returning();

    // Update car status to rented
    await db
      .update(cars)
      .set({ status: "rented", updatedAt: new Date() })
      .where(eq(cars.id, booking.carId));

    return apiResponse(result[0]);
  } catch (error) {
    return apiError("Failed to approve booking", 500);
  }
}
```

### 3.4 Reject Booking

**File:** `src/app/api/bookings/[id]/reject/route.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { apiResponse, apiError, notFound, requireAdmin } from "@/lib/api-utils";
import { eq } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error === "unauthorized" ? apiError("Unauthorized", 401) : apiError("Forbidden", 403);

  const { id } = await params;

  try {
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, parseInt(id)),
    });

    if (!booking) return notFound("Booking not found");
    if (booking.status !== "pending") return apiError("Booking is not pending", 400);

    const result = await db
      .update(bookings)
      .set({ status: "cancelled", updatedAt: new Date() })
      .where(eq(bookings.id, parseInt(id)))
      .returning();

    return apiResponse(result[0]);
  } catch (error) {
    return apiError("Failed to reject booking", 500);
  }
}
```

---

## Phase 4: Connect UI to API

### 4.1 Admin Fleet Page

**File:** `src/app/(admin)/fleet/page.tsx`

Update to fetch from `/api/cars` and implement add/edit/delete functionality.

```typescript
"use client";

import { useEffect, useState } from "react";
// ... imports

export default function FleetPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus mobil ini?")) return;
    
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCars(cars.filter((car) => car.id !== id));
      // Show toast
    }
  };

  // ... rest of component
}
```

### 4.2 Admin Bookings Page

**File:** `src/app/(admin)/bookings/page.tsx`

Update to fetch from `/api/bookings` and implement approve/reject.

```typescript
const handleApprove = async (id: number) => {
  const res = await fetch(`/api/bookings/${id}/approve`, { method: "POST" });
  if (res.ok) {
    // Refresh data
    // Show toast
  }
};

const handleReject = async (id: number) => {
  const res = await fetch(`/api/bookings/${id}/reject`, { method: "POST" });
  if (res.ok) {
    // Refresh data
    // Show toast
  }
};
```

### 4.3 Customer Cars Page

**File:** `src/app/(customer)/cars/page.tsx`

Update to fetch available cars from `/api/cars?status=available`.

### 4.4 Customer Booking Page

**File:** `src/app/(customer)/booking/page.tsx`

Update to submit booking to `/api/bookings`.

### 4.5 Customer My Bookings Page

**File:** `src/app/(customer)/my-bookings/page.tsx`

Update to fetch user's bookings from `/api/bookings`.

---

## Phase 5: Toast Notifications

### 5.1 Install Sonner

```bash
bunx shadcn@latest add sonner
```

### 5.2 Add Toaster to Layout

**File:** `src/app/layout.tsx`

```typescript
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

### 5.3 Use in Components

```typescript
import { toast } from "sonner";

const handleSubmit = async () => {
  try {
    const res = await fetch("/api/bookings", { method: "POST", body: JSON.stringify(data) });
    if (res.ok) {
      toast.success("Booking berhasil dibuat!");
    } else {
      toast.error("Gagal membuat booking");
    }
  } catch (error) {
    toast.error("Terjadi kesalahan");
  }
};
```

---

## Files Checklist

### Phase 1: Server Infrastructure
- [ ] `src/lib/api-utils.ts`
- [ ] `src/lib/auth-middleware.ts`
- [ ] `src/middleware.ts`

### Phase 2: Cars API
- [ ] `src/app/api/cars/route.ts`
- [ ] `src/app/api/cars/[id]/route.ts`

### Phase 3: Bookings API
- [ ] `src/app/api/bookings/route.ts`
- [ ] `src/app/api/bookings/[id]/route.ts`
- [ ] `src/app/api/bookings/[id]/approve/route.ts`
- [ ] `src/app/api/bookings/[id]/reject/route.ts`

### Phase 4: UI Connection
- [ ] `src/app/(admin)/fleet/page.tsx` - Connect to API
- [ ] `src/app/(admin)/bookings/page.tsx` - Connect to API
- [ ] `src/app/(admin)/dashboard/page.tsx` - Real stats
- [ ] `src/app/(customer)/cars/page.tsx` - Connect to API
- [ ] `src/app/(customer)/booking/page.tsx` - Connect to API
- [ ] `src/app/(customer)/my-bookings/page.tsx` - Connect to API

### Phase 5: Toast Notifications
- [ ] Install sonner
- [ ] `src/app/layout.tsx` - Add Toaster
- [ ] Add toast notifications to all form submissions

---

## Additional Improvements (Future)

- [ ] Add car features API (`/api/cars/[id]/features`)
- [ ] Add document upload API (`/api/documents`)
- [ ] Add tracking history API (`/api/tracking`)
- [ ] Implement server-side validation with Zod
- [ ] Add rate limiting
- [ ] Add pagination for list endpoints
- [ ] Add WebSocket for real-time tracking (Phase 6)
