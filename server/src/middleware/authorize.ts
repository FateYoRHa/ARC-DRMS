import { Request, Response, NextFunction } from "express";
import { Roles } from "../auth/rbac/roles";
import { AppError } from "../errors/AppError";
import { hasRole, hasAnyRole } from "../auth/rbac/access";

export function requireRole(role: Roles) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (hasRole(req.user.role, role)) {
      next();
    } else {
      throw new AppError(403, "Unauthorized.");
    }
  };
}

export function requireAnyRole(roles: Roles[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (hasAnyRole(req.user.role, roles)) {
      next();
    } else {
      throw new AppError(403, "Unauthorized.");
    }
  };
}
