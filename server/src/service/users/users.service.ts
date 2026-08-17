import { db } from "../../database/db";
import { users } from "../../database/schema";
import { eq } from "drizzle-orm";
import { AppError } from "../../errors/AppError";

export async function getAllUsersService() {
  const allUsers = await db.select().from(users);
  return allUsers;
}

export async function getUserByIdService(id: number) {
  const user = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  if (!user || user.length === 0) {
    throw new AppError(404, `User with ID ${id} not found`);
  }
  return user[0];
}
