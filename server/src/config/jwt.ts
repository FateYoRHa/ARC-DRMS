import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

export function signAccessToken(
  payload: object,
  secret: string,
  expiresIn: string,
) {
  const accessToken = jwt.sign(payload, secret, {
    expiresIn: expiresIn as StringValue,
  });
  return accessToken;
}

export function signRefreshToken(
  payload: object,
  secret: string,
  expiresIn: string,
) {
  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: expiresIn as StringValue,
  });
  return refreshToken;
}
