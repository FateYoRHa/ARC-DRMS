import { z } from "zod";
import {
  admissionInsertSchema,
  admissionUpdateSchema,
} from "../zod/admission.zod";
import { InferInsertModel } from "drizzle-orm";
import { admissions } from "../../database/schema";

const currentYear = new Date().getFullYear();

const sexValues = ["male", "female"] as const;
const entranceStatusValues = ["incoming_first_year", "transferee", "returning_student"] as const;
const admissionStatusValues = ["pending", "for_id", "for_approval", "for_encoding", "registered"] as const;

const phoneNumberSchema = z
  .string()
  .trim()
  .regex(/^([+]?[-\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[-\s]?[0-9])+$/, {
    message: "Invalid phone number.",
  });

const createAdmissionFieldSchema = {
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
  guardian_phone_number: phoneNumberSchema,
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
  previous_school: z
    .string()
    .trim()
    .min(2, "Invalid school name.")
    .max(60, "Invalid school name.")
    .optional(),
  year_graduated: z
    .number()
    .int({ message: "Year must be a whole number" })
    .gte(1900, { message: "Year must be 1900 or later" })
    .refine((val) => val <= currentYear, {
      message: `Year must be less than or equal to ${currentYear}`,
    }),
  entrance_status: z.enum(entranceStatusValues, {
    message: "Invalid entrance status.",
  }),
  status: z.enum(admissionStatusValues, {
    message: "Invalid admission status.",
  }),
  isActive: z.boolean({ message: "isActive must be a boolean." }),
};

const updateAdmissionFieldSchema = {
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
  guardian_phone_number: phoneNumberSchema.optional(),
  house_number: z.string().trim().max(20, "House number is too long.").optional(),
  nationality: z
    .string()
    .trim()
    .min(2, "Nationality is required.")
    .max(60, "Nationality is too long.")
    .optional(),
  entrance_status: z.enum(entranceStatusValues, {
    message: "Invalid entrance status.",
  }).optional(),
  status: z.enum(admissionStatusValues, {
    message: "Invalid admission status.",
  }).optional(),
  isActive: z.boolean({ message: "isActive must be a boolean." }).optional(),
};

export const newAdmissionSchema = admissionInsertSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend(createAdmissionFieldSchema);

export const updateAdmissionSchema = admissionUpdateSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .extend(updateAdmissionFieldSchema)
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateAdmissionInput = z.infer<typeof newAdmissionSchema>;
export type UpdateAdmissionInput = z.infer<typeof updateAdmissionSchema>;

export type NewAdmission = InferInsertModel<typeof admissions>;
