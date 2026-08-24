import { schools } from "../../database/schema";
import { db } from "../../database/db";
import { eq } from "drizzle-orm";

import type {
  NewSchool,
  UpdateSchoolInput,
} from "../../validators/api/schools.validator";

export async function retrieveSchoolService(id: number) {
  const school = await db.select().from(schools).where(eq(schools.id, id));
  return school;
}

export async function retrieveSchoolsService() {
  const schoolsList = await db.select().from(schools);
  return schoolsList;
}

export async function createSchoolService(schoolData: NewSchool) {
  const newSchool = await db.insert(schools).values(schoolData);
  return newSchool;
}

export async function updateSchoolService(
  id: number,
  schoolData: UpdateSchoolInput,
) {
  const updatedSchool = await db
    .update(schools)
    .set(schoolData)
    .where(eq(schools.id, id));
  return updatedSchool;
}

export async function archiveSchoolService(id: number) {
  const archivedSchool = await db
    .update(schools)
    .set({ isActive: false })
    .where(eq(schools.id, id));
  return archivedSchool;
}

export async function restoreSchoolService(id: number) {
  const restoredSchool = await db
    .update(schools)
    .set({ isActive: true })
    .where(eq(schools.id, id));
  return restoredSchool;
}
