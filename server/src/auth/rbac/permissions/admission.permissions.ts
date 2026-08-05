export const admissions = {
  READ: "admissions.read",
  READ_ADMISSION: "grades.read.admission",
  UPDATE: "admissions.update",
  CREATE: "admissions.create",
  ARCHIVE: "admissions.archive",
  RESTORE: "admissions.restore",
  DELETE: "admissions.delete",
} as const;

export const admissionPermissions = Object.values(admissions)
