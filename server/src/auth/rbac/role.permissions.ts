import { roles } from "./roles";
import * as permissions from "./permissions/index.permissions";

export const role_permissions = {
  [roles.ADMIN]: [
    // students
    permissions.studentPermissions,
    // admissions
    permissions.admissionPermissions,
    // records
    permissions.recordPermissions,
    // dashboard
    permissions.dashboardPermissions,
    // reports
    permissions.reportPermissions,
  ],
  [roles.REGISTRAR]: [
    // students
    permissions.studentPermissions,
    // admissions (enrollment)
    permissions.admissionPermissions,
    // records
    permissions.records.READ,
    permissions.records.CREATE,
    permissions.records.GENERATE,
    permissions.records.UPDATE,
    // reports
    permissions.reports.READ,
    permissions.reports.GENERATE,
  ],
  [roles.ADMISSIONS]: [
    // students
    permissions.students.READ,
    permissions.students.CREATE,
    // admissions (enrollment)
    permissions.admissions.READ,
    permissions.admissions.UPDATE,
    permissions.admissions.CREATE,
    permissions.admissions.ARCHIVE,
    permissions.admissions.RESTORE,
  ],
  [roles.CASHIER]: [
    // payments
    permissions.payments.CREATE,
    permissions.payments.READ,
    permissions.payments.UPDATE,
    // students
    permissions.students.READ,
    // reports
    permissions.reports.GENERATE_PAYMENT,
    permissions.reports.READ_PAYMENT,
  ],
  [roles.FACULTY]: [
    // students
    permissions.students.READ_PROFILE,
    // gradeds
    permissions.grades.READ,
    permissions.grades.CREATE,
    permissions.grades.UPDATE,
  ],
  [roles.STUDENT]: [
    // student
    permissions.students.READ_PROFILE,
    // grades
    permissions.grades.READ_OWN,
    // admission
    permissions.admissions.READ_ADMISSION,
  ],
};

export type Permissions = typeof role_permissions;
