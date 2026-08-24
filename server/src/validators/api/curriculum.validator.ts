import { InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import { curriculums } from "../../database/schema";
import {
  curriculumsInsertSchema,
  curriculumsUpdateSchema,
} from "../zod/curriculum.zod";

const createCurriculumFieldSchema = {
  program_id: z.number().int().positive(),
  school_id: z.number().int().positive(),
  name: z
    .string()
    .trim()
    .min(2, "Curriculum name must be at least 2 characters.")
    .max(120, "Curriculum name is too long."),
  effective_school_year_id: z.number().int().positive(),
};

const updateCurriculumFieldSchema = {
  program_id: createCurriculumFieldSchema.program_id,
  school_id: createCurriculumFieldSchema.school_id,
  name: createCurriculumFieldSchema.name,
  effective_school_year_id: createCurriculumFieldSchema.effective_school_year_id,
};

export const newCurriculumSchema = curriculumsInsertSchema
  .omit({
    id: true,
    version: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend(createCurriculumFieldSchema);

export const updateCurriculumSchema = curriculumsUpdateSchema
  .omit({
    id: true,
    version: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend(updateCurriculumFieldSchema)
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateCurriculumInput = z.infer<typeof newCurriculumSchema>;
export type UpdateCurriculumInput = z.infer<typeof updateCurriculumSchema>;

export type NewCurriculum = InferInsertModel<typeof curriculums>;
