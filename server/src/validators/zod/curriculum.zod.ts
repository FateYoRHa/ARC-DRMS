import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { curriculums } from "../../database/schema/academic/curriculums";

// THESE Generate Zod schemas from the database schema.
export const curriculumsInsertSchema = createInsertSchema(curriculums);
export const curriculumsUpdateSchema = createUpdateSchema(curriculums);