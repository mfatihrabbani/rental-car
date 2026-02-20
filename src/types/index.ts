import type { users, cars, bookings, carFeatures } from "@/db/schema";

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
export type CarFeature = typeof carFeatures.$inferSelect;

export type CarStatus = "available" | "rented" | "maintenance";
export type BookingStatus = "pending" | "approved" | "active" | "completed" | "cancelled";
export type UserRole = "admin" | "customer";

export interface CarWithFeatures extends Car {
  features: CarFeature[];
}

export interface BookingWithDetails extends Booking {
  user: User;
  car: Car;
}
