import { db } from "../database/db";
import { eq } from "drizzle-orm";

import { users } from "../database/schema";
import { AppError } from "../errors/AppError";
import { hashPassword } from "../utils/password";
import { comparePassword } from "../utils/password";
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

export async function loginService(email: string, password: string) {
  const user = await db
    .select({
      id: users.id,
      password: users.password,
      role: users.role,
      is_active: users.is_active,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then((rows) => rows[0]);

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new AppError(401, "Invalid email or password");
  }

  return user;
}
