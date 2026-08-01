export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly isOperational = true,
    public readonly details?: unknown,
  ) {
    super(message);

    this.name = new.target.name;

    Error.captureStackTrace?.(this, new.target);
  }
}
