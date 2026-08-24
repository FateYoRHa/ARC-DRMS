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
