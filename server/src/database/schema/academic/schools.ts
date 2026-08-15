import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
export const schools = pgTable("schools", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  code: text("code").unique().notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export type School = typeof schools.$inferSelect;
