import { createInsertSchema, createUpdateSchema } from "drizzle-orm/zod";
import { admission } from "../../database/schema/admissions";

// THESE Generate Zod schemas from the database schema.
export const admissionInsertSchema = createInsertSchema(admission);
export const admissionUpdateSchema = createUpdateSchema(admission);
