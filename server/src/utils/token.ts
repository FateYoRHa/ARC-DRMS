import { signAccessToken, signRefreshToken } from "../config/jwt";
import env from "../config/env";
export function generateAccessToken(user: {
  id: number;
  role: string;
  session_id: string;
  token_version: number;
}) {
  return signAccessToken(
    user,
    env.ACCESS_TOKEN_SECRET,
    env.ACCESS_TOKEN_EXPIRES,
  );
}

export function generateRefreshToken(user: {
  id: number;
  session_id: string;
  token_version: number;
}) {
  return signRefreshToken(
    user,
    env.REFRESH_TOKEN_SECRET,
    env.REFRESH_TOKEN_EXPIRES,
  );
}
