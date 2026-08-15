import {
  pgTable,
  serial,
  integer,
  timestamp,
  text,
  date,
  boolean,
} from "drizzle-orm/pg-core";
export const school_years = pgTable("school_years", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  year: integer("year").notNull(),
  is_current: boolean("is_current").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type SchoolYear = typeof school_years.$inferSelect;