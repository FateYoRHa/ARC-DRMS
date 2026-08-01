import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

/**
 * Handles requests that don't match any registered route.
 *
 * This middleware must be registered AFTER all routes.
 *
 * Instead of sending a response directly, we throw/pass an AppError
 * so the global error middleware formats the response consistently.
 */
export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(
    new AppError(
      404,
      `Route '${req.method} ${req.originalUrl}' was not found.`,
    ),
  );
}
