import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  employee_id: varchar("employee_id").unique().notNull(),
  first_name: varchar("first_name").notNull(),
  middle_name: varchar("middle_name"),
  last_name: varchar("last_name").notNull(),
  suffix: varchar("suffix"),
  email: varchar("email").unique().notNull(),
  phone_number: varchar("phone_number").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Teacher = typeof teachers.$inferSelect;
