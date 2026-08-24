import { InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import { schools } from "../../database/schema";
import { schoolInsertSchema, schoolUpdateSchema } from "../zod/schools.zod";

const createSchoolFieldSchema = {
	name: z
		.string()
		.trim()
		.min(6, "School name must be at least 6 characters.")
		.max(120, "School name is too long."),
	code: z
		.string()
		.trim()
		.min(3, "School code must be at least 3 characters.")
		.max(6, "School code is too long."),
	description: z.string().trim().max(1_000, "Description is too long.").optional(),
};

const updateSchoolFieldSchema = {
	name: createSchoolFieldSchema.name.optional(),
	code: createSchoolFieldSchema.code.optional(),
	description: createSchoolFieldSchema.description,
};

export const newSchoolSchema = schoolInsertSchema
	.omit({
    id: true,
    isActive: true,
		createdAt: true,
		updatedAt: true,
	})
	.extend(createSchoolFieldSchema);

export const updateSchoolSchema = schoolUpdateSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	})
	.extend(updateSchoolFieldSchema)
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field must be provided for update.",
	});

export type CreateSchoolInput = z.infer<typeof newSchoolSchema>;
export type UpdateSchoolInput = z.infer<typeof updateSchoolSchema>;

export type NewSchool = InferInsertModel<typeof schools>;
