import z from "zod";

import { InferInsertModel } from "drizzle-orm";
import { users } from "../../database/schema/users";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one digit" })
      .regex(/[\W_]/, {
        message: "Must contain at least one special character",
      }),
    // Matches at least one special character (\W matches non-word, \W_ includes underscore)
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Highlights the confirm field on error
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterUserInput = InferInsertModel<typeof users>;
