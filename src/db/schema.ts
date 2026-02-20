import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  decimal,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["admin", "customer"]);
export const carStatusEnum = pgEnum("car_status", ["available", "rented", "maintenance"]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "approved",
  "active",
  "completed",
  "cancelled",
]);
export const documentTypeEnum = pgEnum("document_type", ["ktp", "sim", "other"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false),
  phone: varchar("phone", { length: 20 }),
  image: text("image"),
  role: userRoleEnum("role").default("customer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: varchar("provider_id", { length: 50 }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const verifications = pgTable("verifications", {
  id: serial("id").primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  licensePlate: varchar("license_plate", { length: 20 }).notNull().unique(),
  type: varchar("type", { length: 50 }).notNull(),
  transmission: varchar("transmission", { length: 20 }).notNull(),
  seats: integer("seats").notNull(),
  pricingPerDay: decimal("pricing_per_day", { precision: 12, scale: 2 }).notNull(),
  status: carStatusEnum("status").default("available").notNull(),
  imageUrl: text("image_url"),
  currentLat: decimal("current_lat", { precision: 10, scale: 7 }),
  currentLng: decimal("current_lng", { precision: 10, scale: 7 }),
  lastLocationUpdate: timestamp("last_location_update"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const carFeatures = pgTable("car_features", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  icon: varchar("icon", { length: 50 }),
});

export const carFeatureValues = pgTable("car_feature_values", {
  id: serial("id").primaryKey(),
  carId: integer("car_id")
    .notNull()
    .references(() => cars.id, { onDelete: "cascade" }),
  featureId: integer("feature_id")
    .notNull()
    .references(() => carFeatures.id, { onDelete: "cascade" }),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  carId: integer("car_id")
    .notNull()
    .references(() => cars.id),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  totalPrice: decimal("total_price", { precision: 12, scale: 2 }).notNull(),
  status: bookingStatusEnum("status").default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  bookingId: integer("booking_id").references(() => bookings.id),
  type: documentTypeEnum("type").notNull(),
  fileUrl: text("file_url").notNull(),
  isVerified: boolean("is_verified").default(false),
  verifiedBy: integer("verified_by").references(() => users.id),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trackingHistory = pgTable("tracking_history", {
  id: serial("id").primaryKey(),
  carId: integer("car_id")
    .notNull()
    .references(() => cars.id),
  lat: decimal("lat", { precision: 10, scale: 7 }).notNull(),
  lng: decimal("lng", { precision: 10, scale: 7 }).notNull(),
  speed: decimal("speed", { precision: 5, scale: 1 }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  documents: many(documents),
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const carsRelations = relations(cars, ({ many }) => ({
  bookings: many(bookings),
  trackingHistory: many(trackingHistory),
  features: many(carFeatureValues),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  car: one(cars, {
    fields: [bookings.carId],
    references: [cars.id],
  }),
  documents: many(documents),
}));

export const trackingHistoryRelations = relations(trackingHistory, ({ one }) => ({
  car: one(cars, {
    fields: [trackingHistory.carId],
    references: [cars.id],
  }),
}));

export const carFeatureValuesRelations = relations(carFeatureValues, ({ one }) => ({
  car: one(cars, {
    fields: [carFeatureValues.carId],
    references: [cars.id],
  }),
  feature: one(carFeatures, {
    fields: [carFeatureValues.featureId],
    references: [carFeatures.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
  booking: one(bookings, {
    fields: [documents.bookingId],
    references: [bookings.id],
  }),
  verifier: one(users, {
    fields: [documents.verifiedBy],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));
