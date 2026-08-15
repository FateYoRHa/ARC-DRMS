import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
export const user_sessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  session_id: uuid("session_id").unique().notNull(),
  user_id: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  refresh_token: text("refresh_token").unique().notNull(),
  token_version: integer("token_version").notNull(),
  user_agent: varchar("user_agent"),
  ip_address: varchar("ip_address").notNull(),
  expires_at: timestamp("expires_at").notNull(),
  last_used_at: timestamp("last_used_at").defaultNow(),
  revoked_at: timestamp("revoked_at"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
