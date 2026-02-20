"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search01Icon, FilterIcon } from "hugeicons-react";

const cars = [
  {
    id: 1,
    name: "Toyota Avanza",
    type: "MPV",
    price: 350000,
    seats: 7,
    transmission: "Automatic",
    features: ["AC", "Bluetooth", "GPS"],
    status: "available",
    image: "https://placehold.co/400x300/e2e8f0/64748b?text=Avanza",
  },
  {
    id: 2,
    name: "Honda HR-V",
    type: "SUV",
    price: 500000,
    seats: 5,
    transmission: "Automatic",
    features: ["AC", "Bluetooth", "Camera", "Sunroof"],
    status: "available",
    image: "https://placehold.co/400x300/e2e8f0/64748b?text=HR-V",
  },
  {
    id: 3,
    name: "Mitsubishi Xpander",
    type: "MPV",
    price: 400000,
    seats: 7,
    transmission: "Automatic",
    features: ["AC", "Bluetooth", "GPS"],
    status: "rented",
    image: "https://placehold.co/400x300/e2e8f0/64748b?text=Xpander",
  },
  {
    id: 4,
    name: "Toyota Innova",
    type: "MPV",
    price: 450000,
    seats: 8,
    transmission: "Manual",
    features: ["AC", "Bluetooth", "DVD Player"],
    status: "available",
    image: "https://placehold.co/400x300/e2e8f0/64748b?text=Innova",
  },
  {
    id: 5,
    name: "Honda Civic",
    type: "Sedan",
    price: 550000,
    seats: 5,
    transmission: "Automatic",
    features: ["AC", "Bluetooth", "Camera", "Sunroof"],
    status: "available",
    image: "https://placehold.co/400x300/e2e8f0/64748b?text=Civic",
  },
  {
    id: 6,
    name: "Toyota Fortuner",
    type: "SUV",
    price: 850000,
    seats: 7,
    transmission: "Automatic",
    features: ["AC", "Bluetooth", "GPS", "4WD"],
    status: "available",
    image: "https://placehold.co/400x300/e2e8f0/64748b?text=Fortuner",
  },
];

const carTypes = ["Semua", "MPV", "SUV", "Sedan"];
const transmissions = ["Semua", "Automatic", "Manual"];

export default function CarsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua");
  const [transmissionFilter, setTransmissionFilter] = useState("Semua");

  const filteredCars = cars.filter((car) => {
    const matchSearch = car.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "Semua" || car.type === typeFilter;
    const matchTransmission =
      transmissionFilter === "Semua" || car.transmission === transmissionFilter;
    return matchSearch && matchType && matchTransmission;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Armada Kami</h1>
        <p className="text-muted-foreground">
          Temukan mobil yang sesuai dengan kebutuhan Anda
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label className="flex items-center gap-2 mb-2">
                <Search01Icon size={16} />
                Cari Mobil
              </Label>
              <Input
                placeholder="Nama mobil..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Label className="flex items-center gap-2 mb-2">
                <FilterIcon size={16} />
                Tipe
              </Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {carTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Label className="mb-2 block">Transmisi</Label>
              <Select
                value={transmissionFilter}
                onValueChange={setTransmissionFilter}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {transmissions.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Card key={car.id} className="overflow-hidden group">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              {car.status === "rented" && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold bg-red-500 px-4 py-2 rounded-lg">
                    Tidak Tersedia
                  </span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{car.name}</h3>
                  <p className="text-sm text-muted-foreground">{car.type}</p>
                </div>
                <span className="text-sm font-medium text-primary">
                  {car.seats} Kursi
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {car.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-muted px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-lg">
                  Rp {car.price.toLocaleString("id-ID")}
                  <span className="text-sm font-normal text-muted-foreground">
                    /hari
                  </span>
                </p>
                <Button
                  size="sm"
                  disabled={car.status === "rented"}
                  asChild={car.status === "available"}
                >
                  {car.status === "available" ? (
                    <Link href={`/booking?carId=${car.id}`}>Sewa</Link>
                  ) : (
                    <span>Tidak Tersedia</span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            Tidak ada mobil yang sesuai dengan pencarian Anda
          </p>
        </div>
      )}
    </div>
  );
}
