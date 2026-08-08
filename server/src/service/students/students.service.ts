import { students } from "../../database/schema";
import { NewStudent } from "../../validators/api/student.validator";
import { db } from "../../database/db";

export async function createStudentService(student: NewStudent) {
  return await db
    .insert(students)
    .values({ ...student })
    .returning();
}
