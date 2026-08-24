import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { curriculum_subjects } from "../../database/schema/academic/curriculum_subjects";

// THESE Generate Zod schemas from the database schema.
export const curriculumSubjectsInsertSchema = createInsertSchema(curriculum_subjects);
export const curriculumSubjectsUpdateSchema = createUpdateSchema(curriculum_subjects);