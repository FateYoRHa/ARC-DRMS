import type { NextFunction, Request, Response, RequestHandler } from "express";
import type { ZodTypeAny } from "zod";

export const validate = <T extends ZodTypeAny>(schema: T): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parseResult.error.format(),
      });
    }

    req.body = parseResult.data;
    return next();
  };
};
