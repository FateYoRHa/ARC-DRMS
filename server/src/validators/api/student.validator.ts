import { z } from "zod";
import {
  studentInsertSchema,
  studentUpdateSchema,
} from "../zod/student.zod";
import { InferInsertModel } from "drizzle-orm";
import { students } from "../../database/schema";

const sexValues = ["male", "female"] as const;

const phoneNumberSchema = z
  .string()
  .trim()
  .regex(/^([+]?[-\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[-\s]?[0-9])+$/, {
    message: "Invalid phone number.",
  });

const createStudentFieldSchema = {
  application_id: z.number().int().positive(),
  first_name: z.string().max(15),
  middle_name: z.string().max(15),
  last_name: z.string().max(15),
  birth_date: z.coerce.date({ message: "Birth date is required." }),
  sex: z.enum(sexValues, {
    message: "Sex must be male or female.",
  }),
  email: z.string().trim().email("Invalid email address"),
  phone_number: phoneNumberSchema,
  guardian: z
    .string()
    .trim()
    .min(2, "Guardian name is required.")
    .max(80, "Guardian name is too long."),
  guadian_phone_number: phoneNumberSchema,
  house_number: z.string().trim().max(20, "House number is too long.").optional(),
  street: z
    .string()
    .trim()
    .min(3, { message: "Invalid street name." })
    .max(120, { message: "Invalid street name." }),
  barangay: z
    .string()
    .trim()
    .min(1, { message: "Invalid barangay/town name." })
    .max(60, { message: "Invalid barangay/town name." }),
  city: z
    .string()
    .trim()
    .min(1, { message: "Invalid city name." })
    .max(60, { message: "Invalid city name." }),
  province: z
    .string()
    .trim()
    .min(1, { message: "Invalid province name." })
    .max(60, { message: "Invalid province name." }),
  zip_code: z
    .string()
    .trim()
    .regex(/^\d{3,9}$/, {
      message: "Invalid zip code.",
    })
    .transform(Number),
  country: z
    .string()
    .trim()
    .min(2, "Country is required.")
    .max(60, "Country is too long."),
  nationality: z
    .string()
    .trim()
    .min(2, "Nationality is required.")
    .max(60, "Nationality is too long."),
};

const updateStudentFieldSchema = {
  birth_date: z.coerce.date({ message: "Birth date is required." }).optional(),
  sex: z.enum(sexValues, {
    message: "Sex must be male or female.",
  }).optional(),
  guardian: z
    .string()
    .trim()
    .min(2, "Guardian name is required.")
    .max(80, "Guardian name is too long.")
    .optional(),
  guadian_phone_number: phoneNumberSchema.optional(),
  house_number: z.string().trim().max(20, "House number is too long.").optional(),
  nationality: z
    .string()
    .trim()
    .min(2, "Nationality is required.")
    .max(60, "Nationality is too long.")
    .optional(),
};

export const newStudentSchema = studentInsertSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend(createStudentFieldSchema);

export const updateStudentSchema = studentUpdateSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .extend(updateStudentFieldSchema)
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateStudentInput = z.infer<typeof newStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;

export type NewStudent = InferInsertModel<typeof students>;
