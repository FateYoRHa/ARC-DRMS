import { NewCurriculumSubject } from "../../validators/api/curriculum_subjects.validator";
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
  subject: NewCurriculumSubject,
) {
  // Implementation for adding a new curriculum subject goes here
  // This function should take a subject object and save it to the database or any other source
  return await db.insert(curriculum_subjects).values(subject);
}
