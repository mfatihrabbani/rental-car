import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar03Icon, Car01Icon } from "hugeicons-react";

const bookings = [
  {
    id: 1,
    car: "Toyota Avanza",
    carType: "MPV",
    startDate: "14 Feb 2026",
    endDate: "16 Feb 2026",
    total: 1050000,
    status: "active",
  },
  {
    id: 2,
    car: "Honda HR-V",
    carType: "SUV",
    startDate: "20 Feb 2026",
    endDate: "22 Feb 2026",
    total: 1500000,
    status: "approved",
  },
  {
    id: 3,
    car: "Mitsubishi Xpander",
    carType: "MPV",
    startDate: "01 Feb 2026",
    endDate: "03 Feb 2026",
    total: 1200000,
    status: "completed",
  },
  {
    id: 4,
    car: "Toyota Innova",
    carType: "MPV",
    startDate: "25 Jan 2026",
    endDate: "27 Jan 2026",
    total: 1350000,
    status: "cancelled",
  },
];

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500 hover:bg-yellow-600",
  approved: "bg-blue-500 hover:bg-blue-600",
  active: "bg-green-500 hover:bg-green-600",
  completed: "bg-gray-500 hover:bg-gray-600",
  cancelled: "bg-red-500 hover:bg-red-600",
};

const statusLabel: Record<string, string> = {
  pending: "Menunggu",
  approved: "Disetujui",
  active: "Aktif",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export default function MyBookingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pesanan Saya</h1>
        <p className="text-muted-foreground">
          Lihat status dan riwayat penyewaan Anda
        </p>
      </div>

      <div className="grid gap-4">
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">
                Belum ada pesanan.{" "}
                <a href="/cars" className="text-primary hover:underline">
                  Cari mobil sekarang
                </a>
              </p>
            </CardContent>
          </Card>
        ) : (
          bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Car01Icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{booking.car}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.carType}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Calendar03Icon size={14} />
                        <span>
                          {booking.startDate} - {booking.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-bold text-lg">
                        Rp {booking.total.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <Badge className={statusColor[booking.status]}>
                      {statusLabel[booking.status]}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
