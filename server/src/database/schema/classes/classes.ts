import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { subjects, sections, teachers, school_years } from "../../schema";
import { class_status, semester } from "../enums";

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  subject_id: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
  section_id: integer("section_id")
    .references(() => sections.id)
    .notNull(),
  teacher_id: integer("teacher_id")
    .references(() => teachers.id)
    .notNull(),
  school_year_id: integer("school_year_id")
    .references(() => school_years.id)
    .notNull(),
  semester: semester("semester").notNull(),
  class_code: varchar("class_code").notNull(),
  status: class_status("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Class = typeof classes.$inferSelect;