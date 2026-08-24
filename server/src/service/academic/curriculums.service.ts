import type {
  NewCurriculum,
  UpdateCurriculumInput,
} from "../../validators/api/curriculum.validator";
import { curriculums } from "../../database/schema";
import { db } from "../../database/db";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export async function retrieveAllCurriculumsService() {
  return await db.select().from(curriculums);
}

export async function retrieveCurriculumService(id: number) {
  const curriculum = await db
    .select()
    .from(curriculums)
    .where(eq(curriculums.id, id));
  return curriculum[0];
}

export async function createCurriculumService(curriculumData: NewCurriculum) {
  return await db.insert(curriculums).values(curriculumData).returning();
}

export async function updateCurriculumService(
  id: number,
  curriculumData: UpdateCurriculumInput,
) {
  return await db
    .update(curriculums)
    .set(curriculumData)
    .where(eq(curriculums.id, id))
    .returning();
}

export async function archiveCurriculumService(id: number) {
  return await db
    .update(curriculums)
    .set({ isActive: false })
    .where(eq(curriculums.id, id))
    .returning();
}

export async function restoreCurriculumService(id: number) {
  return await db
    .update(curriculums)
    .set({ isActive: true })
    .where(eq(curriculums.id, id))
    .returning();
}
