import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { schools } from "./schools";
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  code: text("code").unique().notNull(),
  school_id: integer("school_id").references(() => schools.id, {
    onDelete: "cascade",
  }),
  description: text("description"),
  duration: text("duration"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Program = typeof programs.$inferSelect;
