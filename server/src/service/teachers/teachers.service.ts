import { db } from "../../database/db";
import { teachers, teacherIdCounters } from "../../database/schema";
import { AppError } from "../../errors/AppError";
import type {
  NewTeacher,
  UpdateTeacherInput,
} from "../../validators/api/teachers.validator";
import { eq, sql } from "drizzle-orm";

export async function retrieveTeachersService() {
  return await db.select().from(teachers);
}

export async function retrieveTeacherByIdService(id: number) {
  return await db.select().from(teachers).where(eq(teachers.id, id));
}

export async function createTeacherService(teacher: NewTeacher) {
  return await db.transaction(async (tx) => {
    const year = new Date().getFullYear();
    const [counter] = await tx
      .insert(teacherIdCounters)
      .values({
        year,
        lastNumber: 1,
      })
      .onConflictDoUpdate({
        target: teacherIdCounters.year,
        set: {
          lastNumber: sql`${teacherIdCounters.lastNumber} + 1`,
        },
      })
      .returning({
        lastNumber: teacherIdCounters.lastNumber,
      });

    if (!counter) {
      throw new AppError(400, "Failed to generate teacher number.");
    }

    const employee_id = `${year}${counter.lastNumber
      .toString()
      .padStart(4, "0")}`;

    const newTeacher = await tx
      .insert(teachers)
      .values({ ...teacher, employee_id: employee_id })
      .returning();
    return newTeacher;
  });
}

export async function updateTeacherService(
  id: number,
  teacher: UpdateTeacherInput,
) {
  return await db.update(teachers).set(teacher).where(eq(teachers.id, id));
}

export async function archiveTeacherService(id: number) {
  return await db
    .update(teachers)
    .set({ isActive: false })
    .where(eq(teachers.id, id));
}

export async function restoreTeacherService(id: number) {
  return await db
    .update(teachers)
    .set({ isActive: true })
    .where(eq(teachers.id, id));
}
