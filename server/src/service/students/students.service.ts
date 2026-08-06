import { desc, like } from "drizzle-orm";
import { students } from "../../database/schema";
import { NewStudent } from "../../validators/api/student.validator";
import { db } from "../../database/db";
import { AppError } from "../../errors/AppError";

export async function createStudentService(student: NewStudent) {
  const year = new Date().getFullYear();
  const latest = await db.query.students.findFirst({
    where: like(students.student_id, `${year}%`),
    orderBy: desc(students.student_id),
  });
  const nextSequence = latest ? Number(latest.student_id.slice(4)) + 1 : 1;

  const studentNumber = `${year}${nextSequence.toString().padStart(4, "0")}`;

  return await db
    .insert(students)
    .values({
      ...student,
      student_id: studentNumber,
    })
    .returning();
}
