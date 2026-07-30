import { db } from "../../database/db";
import { eq } from "drizzle-orm";
import { admissions } from "../../database/schema";

export async function createStudentAdmissionService(
  first_name: string,
  middle_name: string,
  last_name: string,
  email: string,
  phone_number: number,
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
      first_name,
      middle_name,
      last_name,
      email,
      phone_number,
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
