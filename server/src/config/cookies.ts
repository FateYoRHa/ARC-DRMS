import env from "./env";
import type { CookieOptions } from "express";

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true, // Prevents XSS script access
  secure: env.NODE_ENV === "production", // Sends over HTTPS only
  // sameSite: "strict", // Mitigates CSRF attacks (use in production)
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days (matches JWT)
  path: "/",
};
