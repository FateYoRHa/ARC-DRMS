import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { school_years } from "./school_years";
import { schools } from "./schools";

export const curriculums = pgTable("curriculums", {
  id: serial("id").primaryKey(),
  program_id: integer("program_id").notNull(),
  school_id: integer("school_id").references(() => schools.id).notNull(),
  name: varchar("name").notNull(),
  effective_school_year_id: integer("effective_school_year_id")
    .references(() => school_years.id)
    .notNull(),
  version: integer("version").default(1),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Curriculum = typeof curriculums.$inferSelect;
