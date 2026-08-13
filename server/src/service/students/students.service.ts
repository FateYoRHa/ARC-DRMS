import { students } from "../../database/schema";
import {
  NewStudent,
  UpdateStudentInput,
} from "../../validators/api/student.validator";
import { db } from "../../database/db";
import { eq } from "drizzle-orm";

export async function createStudentService(student: NewStudent) {
  return await db
    .insert(students)
    .values({ ...student })
    .returning();
}

export async function updateStudentService(
  student: UpdateStudentInput,
  id: number,
) {
  return await db
    .update(students)
    .set(student)
    .where(eq(students.id, id))
    .returning();
}
