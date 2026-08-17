import { users } from "../../database/schema";
import { db } from "../../database/db";
import { eq } from "drizzle-orm";
import env from "../../config/env";
import { hashPassword } from "../../utils/password";

async function main() {
  await createAdmin();
}

async function createAdmin() {
  if (await adminExists()) {
    throw new Error("Admin already initialized");
  }
  const hashedPassword = await hashPassword(env.INITIAL_ADMIN_PASSWORD);

  const admin = {
    name: "Super Admin",
    email: env.INITIAL_ADMIN_EMAIL,
    password: hashedPassword,
    role: "super_admin" as const,
  };
  await db.insert(users).values(admin);
}
async function adminExists() {
  const admin = await db
    .select({ id: users.id })
    .from(users)
    .where(
      eq(users.role, "super_admin") || eq(users.email, env.INITIAL_ADMIN_EMAIL),
    )
    .limit(1);
  return admin.length > 0;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
