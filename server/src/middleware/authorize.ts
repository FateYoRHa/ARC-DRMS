import { Request, Response, NextFunction } from "express";
import { Roles } from "../auth/rbac/roles";
import { AppError } from "../errors/AppError";
import {
  hasRole,
  hasAnyRole,
  hasPermission,
  hasPermissions,
} from "../auth/rbac/access";
import { Permission } from "../auth/rbac/permissions/index.permissions";

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

export function requirePermission(permission: Permission) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (hasPermission(req.user.role, permission)) {
      next();
    } else {
      throw new AppError(403, "Unauthorized.");
    }
  };
}

export function requireAllPermissions(permissions: Permission[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (hasPermissions(req.user.role, permissions)) {
      next();
    } else {
      throw new AppError(403, "Unauthorized.");
    }
  };
}
