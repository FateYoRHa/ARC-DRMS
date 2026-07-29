import { db } from "../database/db";
import { eq } from "drizzle-orm";
import { users } from "../database/schema";
export async function registerUserService(
  name: string,
  email: string,
  password: string,
) {
  const emailExists = await db
    .select({ name: users.name })
    .from(users)
    .where(eq(users.email, email));
  if (emailExists.length > 0) {
    const error = new Error("Email already exists") as Error & {
      status: number;
    };
    error.status = 409;
    throw error;
  }
  return await db.insert(users).values({ name, email, password }).returning();
}
