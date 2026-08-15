import { pgEnum } from "drizzle-orm/pg-core";

export const entrance_status = pgEnum("entrance_status", [
  "incoming_first_year",
  "transferee",
  "returning_student",
]);
export const admission_status = pgEnum("admission_status", [
  "pending",
  "for_id",
  "for_approval",
  "for_encoding",
  "for_registration",
  "registered",
  "rejected",
]);
export const sexes = pgEnum("sexes", ["male", "female"]);

export const student_status = pgEnum("student_status", [
  "active",
  "graduated",
  "transferred",
]);