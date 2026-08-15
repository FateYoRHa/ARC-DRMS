import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { admissions } from "../../database/schema/students/admissions";

// THESE Generate Zod schemas from the database schema.
export const admissionInsertSchema = createInsertSchema(admissions);
export const admissionUpdateSchema = createUpdateSchema(admissions);
