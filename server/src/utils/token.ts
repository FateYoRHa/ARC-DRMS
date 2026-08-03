import { signAccessToken } from "../config/jwt";
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
