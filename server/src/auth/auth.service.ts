import { db } from "../database/db";
import { eq, and } from "drizzle-orm";

import { users, user_sessions } from "../database/schema";
import { AppError } from "../errors/AppError";
import { hashPassword } from "../utils/password";
import { comparePassword } from "../utils/password";
import { RegisterUserInput } from "./validators/auth.api";

import {
  compareRefreshToken,
  hashRefreshToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/token";
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

  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  await db
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

export async function refreshTokenService(
  refreshToken: string,
  ip_address: string,
  user: string,
) {
  if (!refreshToken) {
    throw new AppError(401, "Token not recognized");
  }
  const payload = verifyRefreshToken(refreshToken);

  const hashedToken = await db
    .select({ refresh_token: user_sessions.refresh_token })
    .from(user_sessions)
    .where(
      and(
        eq(user_sessions.session_id, payload.session_id),
        eq(user_sessions.user_id, payload.id),
      ),
    )
    .limit(1)
    .then((rows) => rows[0]);

  if (!hashedToken) {
    throw new AppError(401, "Token not recognized.");
  }

  const decodedToken = await compareRefreshToken(
    refreshToken,
    hashedToken.refresh_token,
  );
  if (!decodedToken) {
    throw new AppError(401, "Token not recognized.");
  }
  await db
    .delete(user_sessions)
    .where(
      and(
        eq(user_sessions.session_id, payload.session_id),
        eq(user_sessions.user_id, payload.id),
      ),
    );
  const sessionId = crypto.randomUUID();
  const newRefreshToken = signRefreshToken({
    id: payload.id,
    session_id: sessionId,
    token_version: 1,
  });
  const refreshTokenValues = verifyRefreshToken(newRefreshToken);
  const hashedRefreshToken = await hashRefreshToken(newRefreshToken);
  await db
    .insert(user_sessions)
    .values({
      session_id: refreshTokenValues.session_id,
      user_id: payload.id,
      refresh_token: hashedRefreshToken,
      token_version: refreshTokenValues.token_version,
      user_agent: "Temporary user agent", //! to be changed later, comes from header
      ip_address: ip_address,
      expires_at: new Date(refreshTokenValues.exp * 1000), //* this makes it so that instead of number .exp date time will be saved to database
      last_used_at: new Date(refreshTokenValues.iat * 1000),
      revoked_at: null,
    })
    .returning();

  const newAccessToken = signAccessToken({
    id: payload.id,
    role: user,
    session_id: sessionId,
    token_version: 1,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}
