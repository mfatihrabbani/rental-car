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
import {
  Add01Icon,
  Edit02Icon,
  Delete02Icon,
  Car01Icon,
} from "hugeicons-react";
import FleetMap from "@/components/maps/FleetMap";

const cars = [
  {
    id: 1,
    name: "Toyota Avanza",
    plate: "B 1234 ABC",
    type: "MPV",
    transmission: "Automatic",
    seats: 7,
    pricePerDay: 350000,
    status: "available",
  },
  {
    id: 2,
    name: "Honda HR-V",
    plate: "B 5678 DEF",
    type: "SUV",
    transmission: "Automatic",
    seats: 5,
    pricePerDay: 500000,
    status: "rented",
  },
  {
    id: 3,
    name: "Mitsubishi Xpander",
    plate: "B 9012 GHI",
    type: "MPV",
    transmission: "Automatic",
    seats: 7,
    pricePerDay: 400000,
    status: "maintenance",
  },
  {
    id: 4,
    name: "Toyota Innova",
    plate: "B 3456 JKL",
    type: "MPV",
    transmission: "Manual",
    seats: 8,
    pricePerDay: 450000,
    status: "available",
  },
  {
    id: 5,
    name: "Honda Civic",
    plate: "B 7890 MNO",
    type: "Sedan",
    transmission: "Automatic",
    seats: 5,
    pricePerDay: 550000,
    status: "available",
  },
];

const statusColor: Record<string, string> = {
  available: "bg-green-500 hover:bg-green-600",
  rented: "bg-blue-500 hover:bg-blue-600",
  maintenance: "bg-orange-500 hover:bg-orange-600",
};

const statusLabel: Record<string, string> = {
  available: "Tersedia",
  rented: "Disewa",
  maintenance: "Maintenance",
};

export default function FleetPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Armada</h2>
          <p className="text-muted-foreground">
            Kelola semua kendaraan rental Anda
          </p>
        </div>
        <Button className="gap-2">
          <Add01Icon size={18} />
          Tambah Mobil
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car01Icon size={20} />
              Peta Armada
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <FleetMap className="rounded-none border-0" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistik Armada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-green-500/10">
                <p className="text-3xl font-bold text-green-500">3</p>
                <p className="text-sm text-muted-foreground">Tersedia</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-500/10">
                <p className="text-3xl font-bold text-blue-500">1</p>
                <p className="text-sm text-muted-foreground">Disewa</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-orange-500/10">
                <p className="text-3xl font-bold text-orange-500">1</p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kendaraan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Mobil</TableHead>
                <TableHead>Plat Nomor</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Transmisi</TableHead>
                <TableHead>Kursi</TableHead>
                <TableHead>Harga/Hari</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell className="font-medium">{car.name}</TableCell>
                  <TableCell>{car.plate}</TableCell>
                  <TableCell>{car.type}</TableCell>
                  <TableCell>{car.transmission}</TableCell>
                  <TableCell>{car.seats}</TableCell>
                  <TableCell>
                    Rp {car.pricePerDay.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColor[car.status]}>
                      {statusLabel[car.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Edit02Icon size={16} />
                      </Button>
                      <Button variant="destructive" size="icon">
                        <Delete02Icon size={16} />
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
