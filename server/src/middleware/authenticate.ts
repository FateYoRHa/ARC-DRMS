import { AppError } from "../errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token";
import { users } from "../database/schema";
import { db } from "../database/db";
import { eq } from "drizzle-orm";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;
  if (!header) {
    throw new AppError(401, "Authorization header is missing");
  }
  const accessToken = extractAccessToken(header);
  const payload = verifyAccessToken(accessToken);
  const [user] = await db
    .select({ id: users.id, is_active: users.is_active })
    .from(users)
    .where(eq(users.id, payload.id));
  if (!user || user.is_active == false) {
    throw new AppError(404, "User not found or is inactive.");
  }
  req.user = {id: payload.id, role: payload.role, sessionId: payload.session_id };
  next();
}

function extractAccessToken(authHeader: string) {
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new AppError(401, "No Authorization header or invalid format.");

  const accessToken = authHeader.split(" ")[1];
  if (!accessToken)
    throw new AppError(401, "No Authorization header or invalid format.");
  return accessToken;
}
