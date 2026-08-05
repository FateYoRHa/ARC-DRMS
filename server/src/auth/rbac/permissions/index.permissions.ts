import { students, studentPermissions } from "./student.permissions";
import { admissions, admissionPermissions } from "./admission.permissions";
import { grades, gradespermissions } from "./grade.permissions";
import { records, recordPermissions } from "./record.permissions";
import { reports, reportPermissions } from "./report.permissions";
import { dashboard, dashboardPermissions } from "./dashboard.permissions";
import { payments, paymentPermissions } from "./payment.permissions";
import { users, userPermissions } from "./users.permission";
import { roles, rolePermissions } from "./roles.permissions";

// Aggregate all permission namespace objects for easier imports elsewhere.
export const permissions = {
  students,
  admissions,
  grades,
  records,
  reports,
  dashboard,
  payments,
  users,
} as const;

export {
  students,
  studentPermissions,
  admissions,
  admissionPermissions,
  grades,
  gradespermissions,
  records,
  recordPermissions,
  reports,
  reportPermissions,
  dashboard,
  dashboardPermissions,
  payments,
  paymentPermissions,
  users,
  userPermissions,
  roles,
  rolePermissions,
};

// Permission union includes strings from every permission category.
// This is the central RBAC permission type used by the helper and role mappings.
export type Permission =
  | typeof studentPermissions[number]
  | typeof admissionPermissions[number]
  | typeof gradespermissions[number]
  | typeof recordPermissions[number]
  | typeof reportPermissions[number]
  | typeof dashboardPermissions[number]
  | typeof paymentPermissions[number]
  | typeof userPermissions[number];
