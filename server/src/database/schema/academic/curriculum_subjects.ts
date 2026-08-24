import { curriculums } from "./curriculums";
import { subjects } from "./subjects";
import { semester, year_level } from "../enums";
import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const curriculum_subjects = pgTable("curriculum_subjects", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  curriculum_id: integer("curriculum_id")
    .references(() => curriculums.id)
    .notNull(),
  subject_id: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
  year_level: year_level("year_level").notNull(),
  semester: semester("semester").notNull(),
  isActive: boolean("is_active").default(true),
  isRequired: boolean("is_required").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type CurriculumSubject = typeof curriculum_subjects.$inferSelect;