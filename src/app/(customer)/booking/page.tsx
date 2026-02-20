"use client";

import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserIcon, Mail01Icon, Call02Icon, Calendar03Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";

const carData = {
  id: 1,
  name: "Toyota Avanza",
  type: "MPV",
  price: 350000,
  seats: 7,
  transmission: "Automatic",
  image: "https://placehold.co/400x300/e2e8f0/64748b?text=Avanza",
};

export default function BookingPage() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      startDate: "",
      endDate: "",
      notes: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Booking submitted:", value);
      alert("Booking berhasil! Silakan tunggu konfirmasi dari admin.");
      router.push("/my-bookings");
    },
  });

  const calculateDays = () => {
    const start = form.getFieldValue("startDate");
    const end = form.getFieldValue("endDate");
    if (start && end) {
      const diff = new Date(end).getTime() - new Date(start).getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const days = calculateDays();
  const total = days * carData.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Form Penyewaan</h1>
        <p className="text-muted-foreground">
          Lengkapi data berikut untuk melakukan pemesanan
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Data Penyewa</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-4"
              >
                <form.Field
                  name="fullName"
                  validators={{
                    onChange: ({ value }) =>
                      value.length < 3 ? "Nama minimal 3 karakter" : undefined,
                  }}
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name} className="flex items-center gap-2">
                        <UserIcon size={16} />
                        Nama Lengkap
                      </Label>
                      <Input
                        id={field.name}
                        placeholder="John Doe"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={
                          field.state.meta.errors.length ? "border-destructive" : ""
                        }
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-destructive text-xs">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <form.Field
                    name="email"
                    validators={{
                      onChange: ({ value }) =>
                        !value.includes("@") ? "Email tidak valid" : undefined,
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name} className="flex items-center gap-2">
                          <Mail01Icon size={16} />
                          Email
                        </Label>
                        <Input
                          id={field.name}
                          type="email"
                          placeholder="nama@email.com"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={
                            field.state.meta.errors.length ? "border-destructive" : ""
                          }
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-destructive text-xs">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="phone"
                    validators={{
                      onChange: ({ value }) =>
                        value.length < 10 ? "Nomor telepon tidak valid" : undefined,
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name} className="flex items-center gap-2">
                          <Call02Icon size={16} />
                          No. Telepon
                        </Label>
                        <Input
                          id={field.name}
                          type="tel"
                          placeholder="08123456789"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={
                            field.state.meta.errors.length ? "border-destructive" : ""
                          }
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-destructive text-xs">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <form.Field
                    name="startDate"
                    validators={{
                      onChange: ({ value }) =>
                        !value ? "Tanggal mulai wajib diisi" : undefined,
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name} className="flex items-center gap-2">
                          <Calendar03Icon size={16} />
                          Tanggal Mulai
                        </Label>
                        <Input
                          id={field.name}
                          type="date"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={
                            field.state.meta.errors.length ? "border-destructive" : ""
                          }
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-destructive text-xs">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="endDate"
                    validators={{
                      onChange: ({ value }) =>
                        !value ? "Tanggal selesai wajib diisi" : undefined,
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Tanggal Selesai</Label>
                        <Input
                          id={field.name}
                          type="date"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={
                            field.state.meta.errors.length ? "border-destructive" : ""
                          }
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-destructive text-xs">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full"
                    >
                      {isSubmitting ? "Memproses..." : "Konfirmasi Sewa"}
                    </Button>
                  )}
                />
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={carData.image}
                  alt={carData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{carData.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {carData.type} • {carData.transmission} • {carData.seats} Kursi
                </p>
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Harga per hari</span>
                  <span>Rp {carData.price.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Durasi</span>
                  <span>{days} hari</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
