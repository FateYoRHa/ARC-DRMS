import { db } from "../database/db";
import { eq } from "drizzle-orm";

import { users } from "../database/schema";
import { AppError } from "../errors/AppError";
import { hashPassword } from "../utils/password";
import { RegisterUserInput } from "./validators/auth.api";

export async function registerUserService(user: RegisterUserInput) {
  const emailExists = await db
    .select()
    .from(users)
    .where(eq(users.email, user.email));
  if (emailExists.length > 0) {
    throw new AppError(409, "Email already exists");
  }

  const hashedPassword = await hashPassword(user.password);
  return await db
    .insert(users)
    .values({ name: user.name, email: user.email, password: hashedPassword })
    .returning();
}
