import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  application_id: integer("application_id").unique(),
  first_name: varchar("first_name").notNull(),
  middle_name: varchar("middle_name").notNull(),
  last_name: varchar("last_name").notNull(),
  student_id: integer("student_id").unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
