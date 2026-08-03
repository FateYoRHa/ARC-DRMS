import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const roles = pgEnum("roles", ["user", "admin", "guest", "student"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  role: roles("role").default("user").notNull(),
  is_active: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});
export type User = typeof users.$inferSelect;

