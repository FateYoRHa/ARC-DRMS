import { db } from "../database/db";
import { eq } from "drizzle-orm";

import { users } from "../database/schema";
import { AppError } from "../errors/AppError";
import { hashPassword } from "../utils/password";
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
    throw new AppError(409, "Email already exists");
  }

  const hashedPassword = await hashPassword(password);
  return await db
    .insert(users)
    .values({ name, email, password: hashedPassword })
    .returning();
}
