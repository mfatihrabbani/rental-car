import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gps01Icon, Car01Icon } from "hugeicons-react";
import FleetMap from "@/components/maps/FleetMap";

const activeRentals = [
  {
    id: 1,
    car: "Honda HR-V",
    plate: "B 5678 DEF",
    customer: "Ani Wijaya",
    startDate: "14 Feb 2026",
    endDate: "16 Feb 2026",
    status: "active",
    speed: 40,
  },
  {
    id: 2,
    car: "Toyota Fortuner",
    plate: "B 2345 XYZ",
    customer: "Dedi Pratama",
    startDate: "13 Feb 2026",
    endDate: "15 Feb 2026",
    status: "active",
    speed: 0,
  },
];

export default function TrackingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Live Tracking</h2>
        <p className="text-muted-foreground">
          Pantau lokasi kendaraan yang sedang disewa secara real-time
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gps01Icon size={20} />
                Peta Real-time
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <FleetMap className="rounded-none border-0 h-[600px]" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Kendaraan Aktif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeRentals.map((rental) => (
                <div
                  key={rental.id}
                  className="p-3 rounded-lg border space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Car01Icon size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{rental.car}</p>
                        <p className="text-xs text-muted-foreground">
                          {rental.plate}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-blue-500 hover:bg-blue-600">
                      {rental.speed > 0 ? `${rental.speed} km/h` : "Berhenti"}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Penyewa: {rental.customer}</p>
                    <p>
                      {rental.startDate} - {rental.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Legenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-green-500" />
                  <span className="text-sm">Tersedia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-blue-500" />
                  <span className="text-sm">Disewa (Aktif)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-orange-500" />
                  <span className="text-sm">Maintenance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
