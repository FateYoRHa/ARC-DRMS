import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "../../database/schema/users";

// THESE Generate Zod schemas from the database schema.
export const userInsertSchema = createInsertSchema(users);
export const userUpdateSchema = createUpdateSchema(users);