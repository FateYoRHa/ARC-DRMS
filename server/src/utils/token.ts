import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import env from "../config/env";

export function signAccessToken(
  payload: {
    id: number;
    role: string;
    session_id: string;
    token_version: number;
  }
) {
  const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES as StringValue,
  });
  return accessToken;
}

export function signRefreshToken(
  payload: {
    id: number;
    session_id: string;
    token_version: number;
  }
) {
  const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES as StringValue,
  });
  return refreshToken;
}