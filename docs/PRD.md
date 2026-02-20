# Product Requirements Document (PRD): Car Rental SaaS Platform

| Attribute | Details |
| --- | --- |
| **Project Name** | RentFlow (SaaS Rental Mobil) |
| **Version** | 2.0 (Shadcn + TanStack Edition) |
| **Status** | Draft / Planning |
| **Target User** | Rental Owners (Admin) & Renters (Customer) |

---

## 1. Executive Summary

Aplikasi web berbasis SaaS untuk manajemen penyewaan mobil *end-to-end*. Platform ini memfasilitasi penyewaan kendaraan bagi customer dengan pengalaman pengguna yang modern, serta memberikan alat manajemen armada yang canggih bagi pemilik rental, termasuk pelacakan lokasi mobil secara *real-time*.

## 2. Technology Stack (Updated)

Spesifikasi teknis ini dipilih untuk performa maksimal (Bun), keamanan tipe data (TypeScript/Zod), dan fleksibilitas UI (Shadcn/TanStack).

| Komponen | Teknologi | Keterangan |
| --- | --- | --- |
| **Runtime & PM** | **Bun** | Runtime JavaScript ultra-cepat untuk install, build, dan run server. |
| **Framework** | **Next.js 15 (App Router)** | Framework React modern untuk SSR dan API Routes. |
| **UI Library** | **shadcn/ui** | Komponen UI berbasis Tailwind CSS yang *copy-paste friendly*. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework. |
| **Form Management** | **TanStack Form** | Headless form management yang performant dan type-safe. |
| **Validation** | **Zod** | Schema validation, terintegrasi dengan TanStack Form. |
| **Icons** | **Hugeicons React** | Library ikon yang modern, rounded, dan konsisten. |
| **Maps** | **React Leaflet (Custom Styled)** | Peta interaktif yang dikustomisasi CSS-nya agar menyatu dengan Shadcn. |
| **Table Data** | **TanStack Table** | Untuk tabel manajemen armada yang kompleks (sorting/filtering). |
| **Database** | **PostgreSQL (Neon)** | Database relasional utama (serverless). |
| **ORM** | **Drizzle ORM** | ORM ringan yang sangat cepat, cocok dengan Bun. |
| **Auth** | **Better Auth** | Authentication library yang lightweight dan TypeScript-friendly. |

---

## 3. Core Features

### A. Customer Features (Mobile First)

1. **Exploration & Search:**
* Pencarian mobil berdasarkan tanggal, durasi, dan tipe (SUV, Sedan, MPV).
* Filter harga dan fitur (misal: "Bluetooth", "Sunroof").


2. **Booking Engine:**
* Flow pemesanan 3 langkah: Pilih Mobil -> Isi Data (TanStack Form) -> Bayar.
* Upload KTP/SIM dengan validasi file type (Zod).


3. **User Dashboard:**
* Melihat status pesanan aktif.
* Riwayat penyewaan.



### B. Admin Features (Dashboard)

1. **Fleet Management (CRUD):**
* Tambah/Edit data mobil, plat nomor, status pajak.
* Set status mobil: *Available, Rented, Maintenance*.


2. **Live Tracking (Map Integration):**
* Peta interaktif yang menampilkan posisi semua armada.
* Marker mobil bergerak *real-time* (via WebSocket).
* Popup info mobil dengan gaya Shadcn Card.


3. **Order Approval:**
* Verifikasi dokumen penyewa (KTP/SIM).
* Approval/Rejection workflow.



---

## 4. User Flow

1. **Search:** User memilih tanggal sewa (14-16 Feb).
2. **Results:** Sistem menampilkan mobil yang *status=available* pada rentang tanggal tersebut.
3. **Detail:** User melihat detail mobil & foto.
4. **Form Input:** User mengisi form data diri (Nama, NIK, No HP) menggunakan **TanStack Form**.
5. **Payment:** User membayar via Payment Gateway.
6. **Tracking (Admin):** Admin memantau mobil yang sedang disewa via **Map Dashboard**.

---

## 5. Database Schema

### Tables

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| **users** | All users (admin & customers) | Has many bookings, documents |
| **cars** | Fleet/vehicle inventory | Has many bookings, tracking_history |
| **bookings** | Rental transactions | Belongs to user, car |
| **tracking_history** | GPS location logs | Belongs to car |
| **car_features** | Features master data (Bluetooth, Sunroof, etc.) | - |
| **car_feature_values** | Pivot: car <-> features | Belongs to car, car_feature |
| **documents** | KTP/SIM uploads | Belongs to user |
| **sessions** | Better Auth sessions | Belongs to user |
| **accounts** | Better Auth accounts | Belongs to user |
| **verifications** | Better Auth verifications | - |

---

## 6. Project Structure

```
rental-car/
├── docs/
│   └── PRD.md
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (admin)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── fleet/page.tsx
│   │   │   ├── tracking/page.tsx
│   │   │   ├── bookings/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (customer)/
│   │   │   ├── page.tsx
│   │   │   ├── cars/page.tsx
│   │   │   ├── cars/[id]/page.tsx
│   │   │   ├── booking/page.tsx
│   │   │   ├── my-bookings/page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   └── auth/[...all]/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── maps/
│   │   ├── forms/
│   │   └── admin/
│   ├── db/
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   └── seed.ts
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── auth-client.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── drizzle.config.ts
├── .env
└── package.json
```

---

## 7. Next Steps

1. Setup repository & Bun environment.
2. Install Shadcn UI & Hugeicons.
3. Setup Database schema dengan Drizzle.
4. Buat Layout Admin Dashboard (Sidebar + Header).
5. Implementasi Fitur CRUD Mobil dulu, baru kemudian Tracking System.
