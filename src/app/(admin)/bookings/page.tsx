import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckmarkCircle02Icon, Cancel01Icon, EyeIcon } from "hugeicons-react";

const bookings = [
  {
    id: 1,
    customer: "Budi Santoso",
    email: "budi@email.com",
    car: "Toyota Avanza",
    startDate: "14 Feb 2026",
    endDate: "16 Feb 2026",
    total: 1050000,
    status: "pending",
  },
  {
    id: 2,
    customer: "Ani Wijaya",
    email: "ani@email.com",
    car: "Honda HR-V",
    startDate: "14 Feb 2026",
    endDate: "16 Feb 2026",
    total: 1500000,
    status: "approved",
  },
  {
    id: 3,
    customer: "Dedi Pratama",
    email: "dedi@email.com",
    car: "Mitsubishi Xpander",
    startDate: "15 Feb 2026",
    endDate: "17 Feb 2026",
    total: 1200000,
    status: "active",
  },
  {
    id: 4,
    customer: "Siti Rahma",
    email: "siti@email.com",
    car: "Toyota Innova",
    startDate: "12 Feb 2026",
    endDate: "14 Feb 2026",
    total: 1350000,
    status: "completed",
  },
  {
    id: 5,
    customer: "Rudi Hartono",
    email: "rudi@email.com",
    car: "Honda Civic",
    startDate: "10 Feb 2026",
    endDate: "12 Feb 2026",
    total: 1100000,
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

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manajemen Pesanan</h2>
        <p className="text-muted-foreground">
          Kelola semua pesanan penyewaan kendaraan
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-500">1</p>
              <p className="text-sm text-muted-foreground">Menunggu Verifikasi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-500">1</p>
              <p className="text-sm text-muted-foreground">Disetujui</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">1</p>
              <p className="text-sm text-muted-foreground">Sedang Berjalan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-500">1</p>
              <p className="text-sm text-muted-foreground">Selesai</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Mobil</TableHead>
                <TableHead>Tanggal Mulai</TableHead>
                <TableHead>Tanggal Selesai</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{booking.car}</TableCell>
                  <TableCell>{booking.startDate}</TableCell>
                  <TableCell>{booking.endDate}</TableCell>
                  <TableCell>
                    Rp {booking.total.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColor[booking.status]}>
                      {statusLabel[booking.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {booking.status === "pending" && (
                        <>
                          <Button
                            variant="default"
                            size="icon"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckmarkCircle02Icon size={16} />
                          </Button>
                          <Button variant="destructive" size="icon">
                            <Cancel01Icon size={16} />
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="icon">
                        <EyeIcon size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
