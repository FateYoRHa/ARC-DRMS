import { InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import { curriculum_subjects } from "../../database/schema";
import { semester, year_level } from "../../database/schema/enums";
import {
  curriculumSubjectsInsertSchema,
  curriculumSubjectsUpdateSchema,
} from "../zod/curriculum_subjects.zod";

const createCurriculumSubjectFieldSchema = {
  name: z
    .string()
    .trim()
    .min(2, "Curriculum subject name must be at least 2 characters.")
    .max(120, "Curriculum subject name is too long."),
  curriculum_id: z.number().int().positive(),
  subject_id: z.number().int().positive(),
  year_level: z.enum(year_level.enumValues, {
    message: "Invalid year level.",
  }),
  semester: z.enum(semester.enumValues, {
    message: "Invalid semester.",
  }),
};

const updateCurriculumSubjectFieldSchema = {
  name: createCurriculumSubjectFieldSchema.name,
  curriculum_id: createCurriculumSubjectFieldSchema.curriculum_id,
  subject_id: createCurriculumSubjectFieldSchema.subject_id,
  year_level: createCurriculumSubjectFieldSchema.year_level,
  semester: createCurriculumSubjectFieldSchema.semester,
  isRequired: z.boolean({ message: "isRequired must be a boolean." }),
};

export const newCurriculumSubjectSchema = curriculumSubjectsInsertSchema
  .omit({
    id: true,
    isActive: true,
    isRequired: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend(createCurriculumSubjectFieldSchema);

export const updateCurriculumSubjectSchema = curriculumSubjectsUpdateSchema
  .omit({
    id: true,
    isActive: true,
    isRequired: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend(updateCurriculumSubjectFieldSchema)
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateCurriculumSubjectInput = z.infer<
  typeof newCurriculumSubjectSchema
>;
export type UpdateCurriculumSubjectInput = z.infer<
  typeof updateCurriculumSubjectSchema
>;

export type NewCurriculumSubject = InferInsertModel<typeof curriculum_subjects>;
