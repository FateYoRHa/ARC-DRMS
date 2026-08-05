import { role_permissions } from "./role.permissions";
import { Roles } from "./roles";
import { Permission } from "./permissions/index.permissions";

export function hasPermission(role: Roles, permission: Permission) {
  return (
    (role_permissions[role] as readonly Permission[]).includes(permission) ??
    false
  );
}
