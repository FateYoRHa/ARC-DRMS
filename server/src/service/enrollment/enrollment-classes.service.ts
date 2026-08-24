import { eq } from "drizzle-orm";
import { db } from "../../database/db";
import { enrollment_classes } from "../../database/schema";
import type {
  NewEnrollmentClass,
  UpdateEnrollmentClassInput,
} from "../../validators/api/enrollment-classes.validator";

export async function retrieveEnrollmentClassService(id: number) {
  return db
    .select()
    .from(enrollment_classes)
    .where(eq(enrollment_classes.id, id));
}

export async function retrieveEnrollmentClassesService() {
  return db.select().from(enrollment_classes);
}

export async function createEnrollmentClass(
  newEnrollmentClass: NewEnrollmentClass,
) {
  return db.insert(enrollment_classes).values(newEnrollmentClass).returning();
}

export async function updateEnrollmentClassService(
  id: number,
  updateEnrollmentClassInput: UpdateEnrollmentClassInput,
) {
  return db
    .update(enrollment_classes)
    .set(updateEnrollmentClassInput)
    .where(eq(enrollment_classes.id, id))
    .returning();
}

export async function deleteEnrollmentClassService(id: number) {
  return db
    .delete(enrollment_classes)
    .where(eq(enrollment_classes.id, id))
    .returning();
}