import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { programs } from "../../database/schema/academic/programs";

// THESE Generate Zod schemas from the database schema.
export const programInsertSchema = createInsertSchema(programs);
export const programUpdateSchema = createUpdateSchema(programs);
