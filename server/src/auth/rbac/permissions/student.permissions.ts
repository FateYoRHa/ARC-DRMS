export const students = {
  READ: "students.read",
  UPDATE: "students.update",
  CREATE: "students.create",
  ARCHIVE: "students.archive",
  RESTORE: "students.restore",
  DELETE: "students.delete",
  READ_PROFILE: "students.read.profile",
  READ_STUDENT: "student.read.student",
} as const;

export const studentPermissions = Object.values(students);
