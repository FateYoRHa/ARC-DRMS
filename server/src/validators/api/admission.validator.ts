import { z } from "zod";
import {
  admissionInsertSchema,
  admissionUpdateSchema,
} from "../zod/admission.zod";

const currentYear = new Date().getFullYear();

export const newAdmissionSchema = admissionInsertSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    application_id: z.string(),
    first_name: z.string().max(15),
    middle_name: z.string().max(15),
    last_name: z.string().max(15),
    email: z.string().email("Invalid email address"),
    phone_number: z
      .string()
      .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, {
        message: "Invalid phone number.",
      }),
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
      }),
    country: z
      .string()
      .trim()
      .min(2, "Country is required.")
      .max(60, "Country is too long."),
    previous_school: z
      .string()
      .trim()
      .min(2, "Invalid school name.")
      .max(60, "Invalid school name."),
    year_graduated: z
      .number()
      .int({ message: "Year must be a whole number" })
      .gte(1900, { message: "Year must be 1900 or later" })
      .refine((val) => val <= currentYear, {
        message: `Year must be less than or equal to ${currentYear}`,
      }),
  });

export const updateAdmissionSchema = admissionUpdateSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });
