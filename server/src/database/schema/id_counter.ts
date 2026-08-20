import { integer, pgTable } from "drizzle-orm/pg-core";

export const admissionIdCounters = pgTable("id_counters", {
  year: integer("year").primaryKey(),
  lastNumber: integer("last_number").notNull().default(0),
});

export const teacherIdCounters = pgTable("teacher_id_counters", {
  year: integer("year").primaryKey(),
  lastNumber: integer("last_number").notNull().default(0),
});