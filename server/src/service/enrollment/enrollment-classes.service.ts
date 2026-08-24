import { eq } from "drizzle-orm";
import { db } from "../../database/db";
import { enrollment_classes } from "../../database/schema";
import type {
  NewEnrollmentClass,
  UpdateEnrollmentClassInput,
} from "../../validators/api/enrollment-classes.validator";

export async function retrieveEnrollmentClass(id: number) {
  return db
    .select()
    .from(enrollment_classes)
    .where(eq(enrollment_classes.id, id));
}

export async function retrieveEnrollmentClasses() {
  return db.select().from(enrollment_classes);
}
