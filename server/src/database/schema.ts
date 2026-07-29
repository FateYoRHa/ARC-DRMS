import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  role: varchar("role").default("user"),
  createdAt: timestamp("created_at").defaultNow()
});
