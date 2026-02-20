import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Car01Icon,
  MoneyBag01Icon,
  UserIcon,
  Calendar03Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "hugeicons-react";

const stats = [
  {
    title: "Total Armada",
    value: "24",
    change: "+2",
    changeType: "up",
    icon: Car01Icon,
  },
  {
    title: "Pendapatan Bulan Ini",
    value: "Rp 45.200.000",
    change: "+12%",
    changeType: "up",
    icon: MoneyBag01Icon,
  },
  {
    title: "Pelanggan Aktif",
    value: "156",
    change: "+8",
    changeType: "up",
    icon: UserIcon,
  },
  {
    title: "Pesanan Pending",
    value: "5",
    change: "-2",
    changeType: "down",
    icon: Calendar03Icon,
  },
];

const recentBookings = [
  {
    id: 1,
    customer: "Budi Santoso",
    car: "Toyota Avanza",
    date: "13 Feb 2026",
    status: "pending",
  },
  {
    id: 2,
    customer: "Ani Wijaya",
    car: "Honda HR-V",
    date: "14 Feb 2026",
    status: "approved",
  },
  {
    id: 3,
    customer: "Dedi Pratama",
    car: "Mitsubishi Xpander",
    date: "15 Feb 2026",
    status: "active",
  },
  {
    id: 4,
    customer: "Siti Rahma",
    car: "Toyota Innova",
    date: "12 Feb 2026",
    status: "completed",
  },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "secondary",
  approved: "default",
  active: "default",
  completed: "outline",
  cancelled: "destructive",
};

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500 hover:bg-yellow-600",
  approved: "bg-blue-500 hover:bg-blue-600",
  active: "bg-green-500 hover:bg-green-600",
  completed: "",
  cancelled: "",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Selamat datang kembali! Berikut ringkasan bisnis Anda hari ini.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon size={18} className="text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.changeType === "up" ? (
                  <ArrowUp01Icon size={12} className="text-green-500 mr-1" />
                ) : (
                  <ArrowDown01Icon size={12} className="text-red-500 mr-1" />
                )}
                <span className={stat.changeType === "up" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1">dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Pesanan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{booking.customer}</p>
                    <p className="text-sm text-muted-foreground">{booking.car}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                    <Badge className={statusColor[booking.status]}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Status Armada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-green-500" />
                  <span className="text-sm">Tersedia</span>
                </div>
                <span className="font-bold">18</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-blue-500" />
                  <span className="text-sm">Disewa</span>
                </div>
                <span className="font-bold">4</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-orange-500" />
                  <span className="text-sm">Maintenance</span>
                </div>
                <span className="font-bold">2</span>
              </div>
            </div>
            <div className="mt-6 h-4 rounded-full overflow-hidden bg-secondary flex">
              <div className="bg-green-500 w-[75%]" />
              <div className="bg-blue-500 w-[17%]" />
              <div className="bg-orange-500 w-[8%]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
