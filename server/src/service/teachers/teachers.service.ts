import { db } from "../../database/db";
import { teachers } from "../../database/schema";

export async function getTeachersService() {
  return await db.select().from(teachers);
}
