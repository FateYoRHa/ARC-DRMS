import { role_permissions } from "./role.permissions";
import { Roles } from "./roles";
import { Permission } from "./permissions/index.permissions";

export function hasPermission(role: Roles, permission: Permission) {
  return (
    (role_permissions[role] as readonly Permission[]).includes(permission) ??
    false
  );
}

export function hasPermissions(role: Roles, permissions: Permission[]) {
  const rolePermissions = role_permissions[role] as readonly Permission[];

  return permissions.every((permission) => rolePermissions.includes(permission));
}

export function hasRole(role: Roles, required: Roles) {
  return role === required;
}

export function hasAnyRole(role: Roles, required: Roles[]) {
  return required.includes(role);
}
