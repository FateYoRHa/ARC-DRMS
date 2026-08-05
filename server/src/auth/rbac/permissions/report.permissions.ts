export const reports = {
  READ: "reports.read",
  GENERATE: "reports.generate",
  READ_PAYMENT: "reports.view.read.payment",
  GENERATE_PAYMENT: "reports.generate.payment.report",
} as const;

export const reportPermissions = Object.values(reports);
