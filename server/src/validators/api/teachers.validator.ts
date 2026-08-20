import { z } from "zod";
import { teacherInsertSchema, teacherUpdateSchema } from "../zod/teachers.zod";
import { InferInsertModel } from "drizzle-orm";
import { teachers } from "../../database/schema";

const phoneNumberSchema = z
  .string()
  .trim()
  .regex(/^([+]?[-\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[-\s]?[0-9])+$/, {
    message: "Invalid phone number.",
  });

const createTeacherFieldSchema = {
  first_name: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(15, "First name is too long."),
  middle_name: z.string().trim().max(15, "Middle name is too long.").optional(),
  last_name: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(15, "Last name is too long."),
  suffix: z.string().trim().max(10, "Suffix is too long.").optional(),
  email: z.string().trim().email("Invalid email address."),
  phone_number: phoneNumberSchema,
};

const updateTeacherFieldSchema = {
  first_name: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(15, "First name is too long.")
    .optional(),
  middle_name: z.string().trim().max(15, "Middle name is too long.").optional(),
  last_name: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(15, "Last name is too long.")
    .optional(),
  suffix: z.string().trim().max(10, "Suffix is too long.").optional(),
  email: z.string().trim().email("Invalid email address.").optional(),
  phone_number: phoneNumberSchema.optional(),
};

export const newTeacherSchema = teacherInsertSchema
  .omit({
    id: true,
    employee_id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend(createTeacherFieldSchema);

export const updateTeacherSchema = teacherUpdateSchema
  .omit({
    id: true,
    employee_id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend(updateTeacherFieldSchema)
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateTeacherInput = z.infer<typeof newTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>;

export type NewTeacher = InferInsertModel<typeof teachers>;
