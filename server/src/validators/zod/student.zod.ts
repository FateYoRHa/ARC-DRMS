import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { students } from "../../database/schema";

// THESE Generate Zod schemas from the database schema.
export const studentInsertSchema = createInsertSchema(students);
export const studentUpdateSchema = createUpdateSchema(students);
