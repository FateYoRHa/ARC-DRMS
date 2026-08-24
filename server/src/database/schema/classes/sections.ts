import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { school_years, curriculum_subjects } from "../../schema";
import { year_level } from "../enums";
export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  program_id: integer("program_id")
    .references(() => curriculum_subjects.id)
    .notNull(),
  school_year_id: integer("school_year_id")
    .references(() => school_years.id)
    .notNull(),
  name: varchar("name").notNull(),
  year_level: year_level("year_level").notNull(),
  capacity: integer("capacity").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Section = typeof sections.$inferSelect;
