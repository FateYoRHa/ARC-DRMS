import { db } from "../../database/db";
import { eq, sql } from "drizzle-orm";
import {
  admissions,
  admissionIdCounters,
  Admission,
} from "../../database/schema";
import { AppError } from "../../errors/AppError";

import {
  NewAdmission,
  UpdateAdmissionInput,
} from "../../validators/api/admission.validator";
import { createStudentService } from "./students.service";

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
  const admission = await db
    .select()
    .from(admissions)
    .where(eq(admissions.id, id))
    .limit(1)
    .then((rows) => rows[0]);
  if (!admission) {
    throw new AppError(404, "Admission not found.");
  }
  const student = admissionToStudent(admission);
  await createStudentService(student);

  return await db
    .update(admissions)
    .set({ status: "registered" })
    .where(eq(admissions.id, id))
    .returning();
}

function admissionToStudent(admission: Admission) {
  return {
    application_id: admission.id,
    student_id: String(admission.application_id),
    first_name: admission.first_name,
    middle_name: admission.middle_name,
    last_name: admission.last_name,
    birth_date: admission.birth_date,
    sex: admission.sex,
    email: admission.email,
    phone_number: admission.phone_number,
    guardian: admission.guardian,
    guadian_phone_number: admission.guadian_phone_number,
    house_number: admission.house_number,
    street: admission.street,
    barangay: admission.barangay,
    city: admission.city,
    province: admission.province,
    zip_code: admission.zip_code,
    country: admission.country,
    nationality: admission.nationality,
  };
}
