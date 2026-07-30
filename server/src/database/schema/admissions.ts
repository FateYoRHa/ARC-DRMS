import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  integer,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const entrance_status = pgEnum("entrance_status", [
  "incoming_first_year",
  "transferee",
  "returning_student",
]);
export const status = pgEnum("status", [
  "pending",
  "for_id",
  "for_approval",
  "for_encoding",
  "registered",
]);

export const admissions = pgTable("admissions", {
  id: serial("id").primaryKey(),
  application_id: integer("application_id").unique(),
  entrance_status: entrance_status(),
  first_name: varchar("first_name").notNull(),
  middle_name: varchar("middle_name").notNull(),
  last_name: varchar("last_name").notNull(),
  email: varchar().notNull(),
  phone_number: integer().notNull(),
  house_number: integer(),
  street: varchar().notNull(),
  barangay: text().notNull(),
  city: text().notNull(),
  province: text().notNull(),
  zip_code: integer().notNull(),
  country: text().notNull(),
  previous_school: text(),
  year_graduated: integer().notNull(),
  status: status().default("pending"),
  isActive: boolean().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
