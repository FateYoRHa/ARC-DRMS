import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";

/**
 * Handles every error that reaches Express.
 * This middleware MUST be the last middleware registered.
 */
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  /**
   * Handle application/business errors.
   *
   * Example:
   * throw new AppError(404, "Student not found")
   */
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  /**
   * Handle Zod validation errors.
   *
   * Example:
   * validate(createStudentValidator)
   */
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: err.issues,
    });
  }

  /**
   * Unknown/unexpected error.
   *
   * Usually indicates:
   * - programming bug
   * - database outage
   * - third-party failure
   */
  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
