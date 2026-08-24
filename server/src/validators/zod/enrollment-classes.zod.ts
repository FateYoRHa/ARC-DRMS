import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { enrollment_classes } from "../../database/schema/enrollment/enrollment_classes";

// THESE Generate Zod schemas from the database schema.
export const enrollmentClassesInsertSchema = createInsertSchema(enrollment_classes);
export const enrollmentClassesUpdateSchema = createUpdateSchema(enrollment_classes);
