import {
  date,
  integer,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
export const user_sessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  session_id: uuid("session_id").unique().notNull(),
  user_id: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  refresh_token: varchar("refresh_token").unique().notNull(),
  user_agent: varchar("user_agent"),
  ip_address: varchar("ip_address").notNull(),
  expires_at: date("expires_at").notNull(),
  last_used_at: date("last_used_at").defaultNow(),
  revoked_at: timestamp("revoked_at"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

