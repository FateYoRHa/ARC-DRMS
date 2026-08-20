import { InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import { programs } from "../../database/schema";
import {
	programInsertSchema,
	programUpdateSchema,
} from "../zod/program.zod";

const createProgramFieldSchema = {
	name: z
		.string()
		.trim()
		.min(2, "Program name must be at least 2 characters.")
		.max(120, "Program name is too long."),
	code: z
		.string()
		.trim()
		.min(2, "Program code must be at least 2 characters.")
		.max(20, "Program code is too long."),
	school_id: z.number().int().positive(),
	description: z.string().trim().max(1_000, "Description is too long."),
	duration: z.string().trim().max(50, "Duration is too long."),
	isActive: z.boolean({ message: "isActive must be a boolean." }),
};

const updateProgramFieldSchema = {
	name: createProgramFieldSchema.name,
	code: createProgramFieldSchema.code,
	school_id: createProgramFieldSchema.school_id,
	description: createProgramFieldSchema.description,
	duration: createProgramFieldSchema.duration,
	isActive: createProgramFieldSchema.isActive,
};

export const newProgramSchema = programInsertSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	})
	.extend(createProgramFieldSchema);

export const updateProgramSchema = programUpdateSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	})
	.extend(updateProgramFieldSchema)
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field must be provided for update.",
	});

export type CreateProgramInput = z.infer<typeof newProgramSchema>;
export type UpdateProgramInput = z.infer<typeof updateProgramSchema>;

export type NewProgram = InferInsertModel<typeof programs>;
