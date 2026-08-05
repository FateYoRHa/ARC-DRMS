import { roles } from "./roles";
import * as permissions from "./permissions/index.permissions";

export const role_permissions = {
  [roles.SUPER_ADMIN]: [
    permissions.users,
    permissions.dashboard,
    permissions.students,
    permissions.grades,
    permissions.payments,
    permissions.reports,
    permissions.admissions,
  ],
  [roles.ADMIN]: [
    permissions.students,
    permissions.admissions,
    permissions.records,
    permissions.dashboard.READ,
    permissions.reports.READ,
    permissions.reports.GENERATE,
  ],
  [roles.REGISTRAR]: [
    // students
    permissions.students.READ,
    permissions.students.ARCHIVE,
    permissions.students.CREATE,
    permissions.students.UPDATE,
    permissions.students.RESTORE,
    // admissions (enrollment)
    permissions.admissions.READ,
    permissions.admissions.UPDATE,
    permissions.admissions.CREATE,
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
    permissions.reports.VIEW_PAYMENT,
  ],
  [roles.FACULTY]: [
    // students
    permissions.students.VIEW_STUDENT,
    // gradeds
    permissions.grades.READ,
    permissions.grades.CREATE,
    permissions.grades.UPDATE,
  ],
  [roles.STUDENT]: [
    // student
    permissions.students.VIEW_PROFILE,
    // grades
    permissions.grades.VIEW_GRADE,
    // admission
    permissions.admissions.VIEW_ADMISSION,
  ],
};
