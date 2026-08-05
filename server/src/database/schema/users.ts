import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { roles } from "../../auth/rbac/roles";
export const role = pgEnum(
  "roles",
  Object.values(roles) as [string, ...string[]],
);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  role: role("role").default("student").notNull(),
  is_active: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
