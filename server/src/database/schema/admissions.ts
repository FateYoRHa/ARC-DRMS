import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  integer,
  text,
  timestamp,
  boolean,
  date,
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
  "for_registration",
  "registered",
  "rejected",
]);
export const sexes = pgEnum("sexes", ["male", "female"]);

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
  }),
  sex: sexes("sex").notNull(),
  email: varchar("email").notNull(),
  phone_number: varchar("phone_number").notNull(),
  guardian: text("guardian").notNull(),
  guadian_phone_number: varchar("guadian_phone_number").notNull(),
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
  status: status("status").default("pending"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
