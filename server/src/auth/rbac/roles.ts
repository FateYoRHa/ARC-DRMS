export const roles = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  REGISTRAR: "registrar",
  ADMISSIONS: "admissions",
  CASHIER: "cashier",
  FACULTY: "faculty",
  STUDENT: "student",
} as const;

export type Roles = (typeof roles)[keyof typeof roles];
