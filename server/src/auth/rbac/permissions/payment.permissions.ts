export const payments = {
  READ: "payments.read",
  UPDATE: "payments.update",
  CREATE: "payments.create",
  ARCHIVE: "payments.archive",
  RESTORE: "payments.restore",
  DELETE: "payments.delete",
} as const;

export const paymentPermissions = Object.values(payments);
