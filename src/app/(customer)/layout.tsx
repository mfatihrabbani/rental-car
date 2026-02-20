import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car01Icon, UserIcon } from "hugeicons-react";
import { authClient } from "@/lib/auth-client";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Car01Icon size={20} />
            </div>
            <span className="text-lg font-bold">RentFlow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/cars" className="text-sm font-medium hover:text-primary transition-colors">
              Armada
            </Link>
            <Link href="/my-bookings" className="text-sm font-medium hover:text-primary transition-colors">
              Pesanan Saya
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <UserIcon size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Car01Icon size={20} className="text-primary" />
              <span className="font-bold">RentFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 RentFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
