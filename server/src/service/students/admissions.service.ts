import { db } from "../../database/db";
import { eq } from "drizzle-orm";
import { admissions } from "../../database/schema";
import { AppError } from "../../errors/AppError";

import {
  NewAdmission,
  UpdateAdmissionInput,
} from "../../validators/api/admission.validator";

export async function createStudentAdmissionService(student: NewAdmission) {
  const emailExists = await db
    .select({ "student.email": admissions.email })
    .from(admissions)
    .where(eq(admissions.email, student.email));
  if (emailExists.length > 0) {
    throw new AppError(409, "Email already exists");
  }
  return await db.insert(admissions).values(student).returning();
}

export async function updateStudentAdmissionService(
  student: UpdateAdmissionInput,
  application_id: number,
) {
  // const emailExists = await db
  //   .select({ email: admissions.email })
  //   .from(admissions)
  //   .where(eq(admissions.email, email));
  // if (emailExists.length > 0) {
  //   throw new AppError(409, "Email already exists");
  // }
  return await db
    .update(admissions)
    .set(student)
    .where(eq(admissions.application_id, application_id))
    .returning();
}

export async function retriveAllStudentAdmissionsService() {
  return await db.select().from(admissions);
}
export async function retriveStudentAdmissionService(application_id: number) {
  return await db
    .select()
    .from(admissions)
    .where(eq(admissions.application_id, application_id));
}
export async function archiveStudentAdmissionService(application_id: number) {
  return await db
    .update(admissions)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(admissions.application_id, application_id))
    .returning();
}

export async function restoreStudentAdmissionService(application_id: number) {
  return await db
    .update(admissions)
    .set({ isActive: true, updatedAt: new Date() })
    .where(eq(admissions.application_id, application_id))
    .returning();
}
