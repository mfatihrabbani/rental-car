"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car01Icon } from "hugeicons-react";

const createCarIcon = (status: string) => {
  const color =
    status === "available"
      ? "#22c55e"
      : status === "rented"
      ? "#3b82f6"
      : "#f97316";

  const iconMarkup = `
    <div style="
      background-color: ${color};
      color: white;
      padding: 4px;
      border-radius: 9999px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      border: 2px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-1.7-2.8-1.7H7c-1.3 0-2.5.7-3.1 1.8L2 12v4c0 .6.4 1 1 1h2"/>
        <circle cx="7" cy="17" r="2"/>
        <circle cx="17" cy="17" r="2"/>
      </svg>
    </div>
  `;

  return new L.DivIcon({
    html: iconMarkup,
    className: "bg-transparent",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

const fleetData = [
  {
    id: 1,
    name: "Toyota Avanza",
    plate: "B 1234 ABC",
    status: "available",
    lat: -6.2088,
    lng: 106.8456,
    driver: null,
  },
  {
    id: 2,
    name: "Honda HR-V",
    plate: "B 5678 DEF",
    status: "rented",
    lat: -6.21,
    lng: 106.85,
    driver: "Budi Santoso",
    speed: 40,
  },
  {
    id: 3,
    name: "Mitsubishi Xpander",
    plate: "B 9012 GHI",
    status: "maintenance",
    lat: -6.205,
    lng: 106.84,
    driver: null,
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

interface FleetMapProps {
  className?: string;
}

export default function FleetMap({ className }: FleetMapProps) {
  return (
    <div
      className={`h-[500px] w-full rounded-xl overflow-hidden border shadow-sm ${className}`}
    >
      <MapContainer
        center={[-6.2088, 106.8456]}
        zoom={14}
        className="h-full w-full"
        style={{ background: "white" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {fleetData.map((car) => (
          <Marker
            key={car.id}
            position={[car.lat, car.lng]}
            icon={createCarIcon(car.status)}
          >
            <Popup className="shadcn-popup">
              <Card className="border-0 shadow-none min-w-[200px]">
                <CardContent className="p-3 space-y-2">
                  <h4 className="font-bold text-sm">{car.name}</h4>
                  <p className="text-xs text-muted-foreground">{car.plate}</p>
                  <Badge className={statusColor[car.status]}>
                    {statusLabel[car.status]}
                  </Badge>
                  {car.driver && (
                    <p className="text-xs text-muted-foreground">
                      Driver: {car.driver}
                      {car.speed && ` (${car.speed} km/h)`}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
