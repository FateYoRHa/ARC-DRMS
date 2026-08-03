import { relations } from "drizzle-orm";

import { users } from "./users";
import { user_sessions } from "./user_sessions";

export const userSessionsRelations = relations(user_sessions, ({ one }) => ({
  user: one(users, {
    fields: [user_sessions.user_id],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(user_sessions),
}));