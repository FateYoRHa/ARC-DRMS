import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { teachers } from "../../database/schema";

// THESE Generate Zod schemas from the database schema.
export const teacherInsertSchema = createInsertSchema(teachers);
export const teacherUpdateSchema = createUpdateSchema(teachers);
