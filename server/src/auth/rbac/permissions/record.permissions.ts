export const records = {
  READ: "records.read",
  UPDATE: "records.update",
  CREATE: "records.create",
  ARCHIVE: "records.archive",
  RESTORE: "records.restore",
  DELETE: "records.delete",
  GENERATE: "records.generate",
} as const;

export const recordPermissions = Object.values(records);
