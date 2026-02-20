import { Car01Icon } from "hugeicons-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground flex-col justify-between p-10">
        <div className="flex items-center gap-2">
          <Car01Icon size={32} />
          <span className="text-2xl font-bold">RentFlow</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            Kelola armada rental Anda dengan mudah
          </h1>
          <p className="text-lg opacity-80">
            Platform SaaS untuk manajemen penyewaan mobil end-to-end dengan
            tracking real-time.
          </p>
        </div>
        <p className="text-sm opacity-60">
          © 2026 RentFlow. All rights reserved.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
