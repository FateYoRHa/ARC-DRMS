import { schools } from "../../database/schema";
import { db } from "../../database/db";
import { eq } from "drizzle-orm";

export async function retrieveSchoolService(id: number) {
  const school = await db.select().from(schools).where(eq(schools.id, id));
  return school;
}

export async function retrieveSchoolsService() {
  const schoolsList = await db.select().from(schools);
  return schoolsList;
}
