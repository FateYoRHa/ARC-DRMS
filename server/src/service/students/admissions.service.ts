import { db } from "../../database/db";
import { eq, sql } from "drizzle-orm";
import { admissions, admissionIdCounters } from "../../database/schema";
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
  id: number,
) {
  return await db
    .update(admissions)
    .set(student)
    .where(eq(admissions.id, id))
    .returning();
}

export async function retriveAllStudentAdmissionsService() {
  return await db.select().from(admissions);
}
export async function retriveStudentAdmissionService(id: number) {
  return await db.select().from(admissions).where(eq(admissions.id, id));
}
export async function archiveStudentAdmissionService(id: number) {
  return await db
    .update(admissions)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(admissions.id, id))
    .returning();
}

export async function restoreStudentAdmissionService(id: number) {
  return await db
    .update(admissions)
    .set({ isActive: true, updatedAt: new Date() })
    .where(eq(admissions.id, id))
    .returning();
}
export async function acceptAdmissionService(id: number) {
  return await db
    .update(admissions)
    .set({ status: "for_approval" })
    .where(eq(admissions.id, id))
    .returning();
}

export async function approveAdmissionService(id: number) {
  return await db
    .update(admissions)
    .set({ status: "for_id" })
    .where(eq(admissions.id, id))
    .returning();
}
export async function idAdmissionService(id: number) {
  return await db.transaction(async (tx) => {
    const year = new Date().getFullYear();

    const [counter] = await tx
      .insert(admissionIdCounters)
      .values({
        year,
        lastNumber: 1,
      })
      .onConflictDoUpdate({
        target: admissionIdCounters.year,
        set: {
          lastNumber: sql`${admissionIdCounters.lastNumber} + 1`,
        },
      })
      .returning({
        lastNumber: admissionIdCounters.lastNumber,
      });

    if (!counter) {
      throw new AppError(400, "Failed to generate student number.");
    }

    const admission_id = `${year}${counter.lastNumber
      .toString()
      .padStart(4, "0")}`;

    await tx
      .update(admissions)
      .set({
        status: "for_encoding",
        application_id: admission_id,
      })
      .where(eq(admissions.id, id));
  });
}
export async function encodeAdmissionService(id: number) {
  return await db
    .update(admissions)
    .set({ status: "for_registration" })
    .where(eq(admissions.id, id))
    .returning();
}
export async function registerAdmissionService(id: number) {
  return await db
    .update(admissions)
    .set({ status: "registered" })
    .where(eq(admissions.id, id))
    .returning();
}
