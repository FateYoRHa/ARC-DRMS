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
  entrance_status: entrance_status("entrance_status").default(
    "incoming_first_year",
  ),
  first_name: varchar("first_name").notNull(),
  middle_name: varchar("middle_name").notNull(),
  last_name: varchar("last_name").notNull(),
  email: varchar("email").notNull(),
  phone_number: varchar("phone_number").notNull(),
  house_number: varchar("house_number"),
  street: varchar("street").notNull(),
  barangay: text("barangay").notNull(),
  city: text("city").notNull(),
  province: text("province").notNull(),
  zip_code: integer("zip_code").notNull(),
  country: text("country").notNull(),
  previous_school: text("previous_school"),
  year_graduated: integer("year_graduated").notNull(),
  status: status("status").default("pending"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
