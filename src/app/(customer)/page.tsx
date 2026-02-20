import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Car01Icon,
  Search01Icon,
  Shield01Icon,
  HeadphonesIcon,
  ArrowRight02Icon,
} from "hugeicons-react";

const features = [
  {
    icon: Car01Icon,
    title: "Armada Lengkap",
    description: "Berbagai pilihan mobil dari sedan hingga MPV untuk kebutuhan Anda",
  },
  {
    icon: Shield01Icon,
    title: "Aman & Terpercaya",
    description: "Semua kendaraan dilengkapi asuransi dan terawat dengan baik",
  },
  {
    icon: HeadphonesIcon,
    title: "Support 24/7",
    description: "Tim customer service siap membantu kapanpun Anda butuhkan",
  },
];

const popularCars = [
  {
    id: 1,
    name: "Toyota Avanza",
    type: "MPV",
    price: 350000,
    seats: 7,
    transmission: "Automatic",
    image: "https://placehold.co/400x300/e2e8f0/64748b?text=Avanza",
  },
  {
    id: 2,
    name: "Honda HR-V",
    type: "SUV",
    price: 500000,
    seats: 5,
    transmission: "Automatic",
    image: "https://placehold.co/400x300/e2e8f0/64748b?text=HR-V",
  },
  {
    id: 3,
    name: "Mitsubishi Xpander",
    type: "MPV",
    price: 400000,
    seats: 7,
    transmission: "Automatic",
    image: "https://placehold.co/400x300/e2e8f0/64748b?text=Xpander",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Sewa Mobil Mudah & Cepat
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Temukan kendaraan terbaik untuk perjalanan Anda dengan harga terjangkau
              dan proses yang simpel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/cars">
                  <Search01Icon size={20} />
                  Lihat Armada
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/register">Daftar Sekarang</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-none shadow-none text-center">
              <CardContent className="pt-6">
                <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Mobil Populer</h2>
              <p className="text-muted-foreground">Pilihan terbaik dari pelanggan kami</p>
            </div>
            <Button variant="ghost" className="gap-2" asChild>
              <Link href="/cars">
                Lihat Semua
                <ArrowRight02Icon size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCars.map((car) => (
              <Card key={car.id} className="overflow-hidden group">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
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
                  <div className="flex items-center justify-between mt-4">
                    <p className="font-bold text-lg">
                      Rp {car.price.toLocaleString("id-ID")}
                      <span className="text-sm font-normal text-muted-foreground">/hari</span>
                    </p>
                    <Button size="sm" asChild>
                      <Link href={`/cars/${car.id}`}>Sewa</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 lg:p-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Memulai Perjalanan?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Daftar sekarang dan dapatkan diskon 10% untuk pemesanan pertama Anda!
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Daftar Gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
