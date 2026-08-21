import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { schools } from "../../database/schema";

export const schoolInsertSchema = createInsertSchema(schools);
export const schoolUpdateSchema = createUpdateSchema(schools);
