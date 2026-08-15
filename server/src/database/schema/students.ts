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
import { admissions } from "./admissions";

const sexes = pgEnum("sexes", ["male", "female"]);

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  application_id: integer("application_id")
    .references(() => admissions.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .unique()
    .notNull(),
  first_name: varchar("first_name").notNull(),
  middle_name: varchar("middle_name").notNull(),
  last_name: varchar("last_name").notNull(),
  student_id: varchar("student_id").unique().notNull(),
  birth_date: date("birth_date", {
    mode: "date",
  }).notNull(),
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
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
