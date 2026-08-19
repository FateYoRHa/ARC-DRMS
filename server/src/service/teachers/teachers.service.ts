import { db } from "../../database/db";
import { teachers } from "../../database/schema";
import { eq } from "drizzle-orm";

export async function getTeachersService() {
  return await db.select().from(teachers);
}

export async function getTeacherByIdService(id: number) {
  return await db.select().from(teachers).where(eq(teachers.id, id));
}


