import type {
  NewCurriculumSubject,
  UpdateCurriculumSubjectInput,
} from "../../validators/api/curriculum_subjects.validator";
import { db } from "../../database/db";
import { curriculum_subjects } from "../../database/schema";
import { eq } from "drizzle-orm";

export async function retrieveCurriculumSubjectsService(id: number) {
  // Implementation for retrieving curriculum subjects goes here
  // This function should return a list of curriculum subjects from the database or any other source
  return await db
    .select()
    .from(curriculum_subjects)
    .where(eq(curriculum_subjects.curriculum_id, id));
}

export async function addCurriculumSubjectService(
  curriculum_subject: NewCurriculumSubject,
) {
  // Implementation for adding a new curriculum subject goes here
  // This function should take a subject object and save it to the database or any other source
  return await db.insert(curriculum_subjects).values(curriculum_subject);
}

export async function updateCurriculumSubjectService(
  id: number,
  curriculum_subject: UpdateCurriculumSubjectInput,
) {
  // Implementation for updating a curriculum subject goes here
  // This function should take an id and a subject object, and update the corresponding record in the database or any other source
  return await db
    .update(curriculum_subjects)
    .set(curriculum_subject)
    .where(eq(curriculum_subjects.id, id));
}

export async function archiveCurriculumSubjectService(id: number) {
  // Implementation for archiving a curriculum subject goes here
  // This function should take an id and mark the corresponding record as archived in the database or any other source
  return await db
    .update(curriculum_subjects)
    .set({ isActive: false })
    .where(eq(curriculum_subjects.id, id));
}

export async function restoreCurriculumSubjectService(id: number) {
  // Implementation for restoring a curriculum subject goes here
  // This function should take an id and mark the corresponding record as active in the database or any other source
  return await db
    .update(curriculum_subjects)
    .set({ isActive: true })
    .where(eq(curriculum_subjects.id, id));
}
