import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { entrance_status, admission_status, sexes } from "./enums";

export const admissions = pgTable("admissions", {
  id: serial("id").primaryKey(),
  application_id: varchar("application_id").unique(),
  entrance_status: entrance_status("entrance_status").default(
    "incoming_first_year",
  ),
  first_name: varchar("first_name").notNull(),
  middle_name: varchar("middle_name").notNull(),
  last_name: varchar("last_name").notNull(),
  birth_date: date("birth_date", {
    mode: "date",
  }).notNull(),
  sex: sexes("sex").notNull(),
  email: varchar("email").notNull(),
  phone_number: varchar("phone_number").notNull(),
  guardian: text("guardian").notNull(),
  guardian_phone_number: varchar("guardian_phone_number").notNull(),
  house_number: varchar("house_number"),
  street: varchar("street").notNull(),
  barangay: text("barangay").notNull(),
  city: text("city").notNull(),
  province: text("province").notNull(),
  zip_code: integer("zip_code").notNull(),
  country: text("country").notNull(),
  nationality: text("nationality").notNull(),
  previous_school: text("previous_school"),
  year_graduated: integer("year_graduated").notNull(),
  status: admission_status("status").default("pending"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Admission = typeof admissions.$inferSelect;
