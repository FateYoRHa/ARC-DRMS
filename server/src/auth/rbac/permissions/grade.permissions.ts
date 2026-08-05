export const grades = {
  READ: "grades.read",
  READ_OWN: "grades.read.own",
  UPDATE: "grades.update",
  CREATE: "grades.create",
  ARCHIVE: "grades.archive",
  RESTORE: "grades.restore",
  DELETE: "grades.delete",
} as const;

export const gradespermissions = Object.values(grades);
