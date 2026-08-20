import { db } from "../../database/db";
import { teachers } from "../../database/schema";
import type { NewTeacher } from "../../validators/api/teachers.validator";
import { eq } from "drizzle-orm";

export async function retrieveTeachersService() {
  return await db.select().from(teachers);
}

export async function retrieveTeacherByIdService(id: number) {
  return await db.select().from(teachers).where(eq(teachers.id, id));
}

export async function createTeacherService(teacher: NewTeacher) {
  return await db.insert(teachers).values(teacher);
}
