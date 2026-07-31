import { db } from "../../database/db";
import { eq } from "drizzle-orm";
import { admissions } from "../../database/schema";

export async function createStudentAdmissionService(
  application_id: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  email: string,
  phone_number: number,
  house_number: number,
  street: string,
  barangay: string,
  city: string,
  province: string,
  zip_code: number,
  country: string,
  previous_school: string,
  year_graduated: number,
) {
  const emailExists = await db
    .select({ email: admissions.email })
    .from(admissions)
    .where(eq(admissions.email, email));
  if (emailExists.length > 0) {
    const error = new Error("Email already exists") as Error & {
      status: number;
    };
    error.status = 409;
    throw error;
  }
  return await db
    .insert(admissions)
    .values({
      application_id,
      first_name,
      middle_name,
      last_name,
      email,
      phone_number,
      house_number,
      street,
      barangay,
      city,
      province,
      zip_code,
      country,
      previous_school,
      year_graduated,
    })
    .returning();
}

export async function updateStudentAdmissionService(
  application_id: number,
  first_name: string,
  middle_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  house_number: string,
  street: string,
  barangay: string,
  city: string,
  province: string,
  zip_code: number,
  country: string,
  previous_school: string,
  year_graduated: number,
) {
  // const emailExists = await db
  //   .select({ email: admissions.email })
  //   .from(admissions)
  //   .where(eq(admissions.email, email));
  // if (emailExists.length > 0) {
  //   const error = new Error("Email already exists") as Error & {
  //     status: number;
  //   };
  //   error.status = 409;
  //   throw error;
  // }
  return await db
    .update(admissions)
    .set({
      first_name,
      middle_name,
      last_name,
      email: email,
      phone_number,
      house_number,
      street,
      barangay,
      city,
      province,
      zip_code,
      country,
      previous_school,
      year_graduated,
    })
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
    .set({ isActive: false, updatedAt:  new Date() })
    .where(eq(admissions.application_id, application_id))
    .returning();
}
