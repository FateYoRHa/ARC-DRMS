import { InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import { enrollment_classes } from "../../database/schema";
import {
  enrollmentClassesInsertSchema,
  enrollmentClassesUpdateSchema,
} from "../zod/enrollment-classes.zod";

const createEnrollmentClassFieldSchema = {
  enrollment_id: z.number().int().positive(),
  class_id: z.number().int().positive(),
};

const updateEnrollmentClassFieldSchema = {
  enrollment_id: createEnrollmentClassFieldSchema.enrollment_id,
  class_id: createEnrollmentClassFieldSchema.class_id,
  status: z.enum(enrollment_classes.status.enumValues, {
    message: "Invalid enrollment status.",
  }),
};

export const newEnrollmentClassSchema = enrollmentClassesInsertSchema
  .omit({
    id: true,
    status: true,
    enrolledAt: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend(createEnrollmentClassFieldSchema);

export const updateEnrollmentClassSchema = enrollmentClassesUpdateSchema
  .omit({
    id: true,
    enrolledAt: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend(updateEnrollmentClassFieldSchema)
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateEnrollmentClassInput = z.infer<
  typeof newEnrollmentClassSchema
>;
export type UpdateEnrollmentClassInput = z.infer<
  typeof updateEnrollmentClassSchema
>;

export type NewEnrollmentClass = InferInsertModel<typeof enrollment_classes>;
