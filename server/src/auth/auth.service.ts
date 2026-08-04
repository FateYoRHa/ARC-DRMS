import { db } from "../database/db";
import { eq } from "drizzle-orm";

import { users, user_sessions } from "../database/schema";
import { AppError } from "../errors/AppError";
import { hashPassword } from "../utils/password";
import { comparePassword } from "../utils/password";
import { RegisterUserInput } from "./validators/auth.api";

import {
  hashRefreshToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/token";
type SessionInsert = typeof user_sessions.$inferInsert;
export async function registerUserService(
  user: RegisterUserInput,
  ip_address: string,
) {
  const emailExists = await db
    .select()
    .from(users)
    .where(eq(users.email, user.email));
  if (emailExists.length > 0) {
    throw new AppError(409, "Email already exists");
  }

  const hashedPassword = await hashPassword(user.password);

  const sessionId = crypto.randomUUID();

  const [newUser] = await db
    .insert(users)
    .values({ name: user.name, email: user.email, password: hashedPassword })
    .returning();

  if (!newUser) {
    throw new AppError(400, "Failed to create user.");
  }
  const refreshToken = signRefreshToken({
    id: newUser.id,
    session_id: sessionId,
    token_version: 1,
  });

  const refresh = verifyRefreshToken(refreshToken);
  console.log(refresh);
  console.log(refresh.exp);
  console.log(typeof refresh.exp);
  console.log(new Date(refresh.exp * 1000));

  console.log(Number.isNaN(refresh.exp));
  const hashedRefreshToken = await hashRefreshToken(refreshToken);
  const reftoken = await db
    .insert(user_sessions)
    .values({
      session_id: refresh.session_id,
      user_id: newUser.id,
      refresh_token: hashedRefreshToken,
      token_version: refresh.token_version,
      user_agent: "Temporary user agent", //! to be changed later, comes from header
      ip_address: ip_address,
      expires_at: new Date(refresh.exp * 1000),
      last_used_at: new Date(refresh.iat * 1000),
      revoked_at: null,
    })
    .returning();
  console.log(reftoken);

  const accessToken = signAccessToken({
    id: newUser.id,
    role: newUser.role,
    session_id: sessionId,
    token_version: 1,
  });
  return { user: newUser, accessToken };
}

export async function loginService(
  email: string,
  password: string,
  ip_address: string,
) {
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
  // generate session ID
  const sessionId = crypto.randomUUID();
  // generate refresh token
  const refreshToken = signRefreshToken({
    id: user.id,
    session_id: sessionId,
    token_version: 1,
  });

  const generatedRefToken = verifyRefreshToken(refreshToken);

  // hash refresh token
  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  // store refresh(hashed) token to database
  await db
    .insert(user_sessions)
    .values({
      session_id: generatedRefToken.session_id,
      user_id: user.id,
      refresh_token: hashedRefreshToken,
      token_version: generatedRefToken.token_version,
      user_agent: "Temporary user agent", //! to be changed later, comes from header
      ip_address: ip_address,
      expires_at: new Date(generatedRefToken.exp * 1000),
      last_used_at: new Date(generatedRefToken.iat * 1000),
      revoked_at: null,
    })
    .returning();

  // generate access token
  const accessToken = signAccessToken({
    id: user.id,
    role: user.role,
    session_id: sessionId,
    token_version: 1,
  });

  return { accessToken, refreshToken };
}

export async function logoutService(refreshToken: string) {
  const token = verifyRefreshToken(refreshToken);
  return await db
    .delete(user_sessions)
    .where(eq(user_sessions.session_id, token.session_id));
}
