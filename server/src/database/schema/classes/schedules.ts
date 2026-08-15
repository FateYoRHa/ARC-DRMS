import {
  pgTable,
  timestamp,
  time,
  serial,
  integer,
  varchar,
} from "drizzle-orm/pg-core";
import { classes } from "./classes";

export const class_schedules = pgTable("class_schedules", {
  id: serial("id").primaryKey(),
  class_id: integer("class_id")
    .references(() => classes.id)
    .notNull(),
  day_of_week: varchar("day_of_week").notNull(),
  start_time: time("start_time").notNull(),
  end_time: time("end_time").notNull(),
  room: varchar("room").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type ClassSchedule = typeof class_schedules.$inferSelect;
