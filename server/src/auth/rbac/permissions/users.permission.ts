export const users = {
  READ: "users.read",
  UPDATE: "users.update",
  CREATE: "users.create",
  ARCHIVE: "users.archive",
  RESTORE: "users.restore",
  DELETE: "users.delete",
  MANAGE: "users.manage",
} as const;

export const userPermissions = Object.values(users);
