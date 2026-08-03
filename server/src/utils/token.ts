import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import env from "../config/env";
import { AppError } from "../errors/AppError";

export function signAccessToken(payload: {
  id: number;
  role: string;
  session_id: string;
  token_version: number;
}) {
  const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES as StringValue,
  });
  return accessToken;
}

export function signRefreshToken(payload: {
  id: number;
  session_id: string;
  token_version: number;
}) {
  const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES as StringValue,
  });
  return refreshToken;
}

export function verifyAccessToken(accessToken: string) {
  try {
    return jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(401, "Access token expired.");
    } else {
      throw new AppError(401, "Invalid access token.");
    }
  }
}
export function verifyRefreshToken(refreshToken: string) {
  try {
    return jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(401, "REFRESH_TOKEN_EXPIRED");
    } else {
      throw new AppError(401, "INVALID_REFRESH_TOKEN");
    }
  }
}
