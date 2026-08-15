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
export const enrollment_status = pgEnum("enrollment_status", [
  "approved",
  "enrolled",
  "dropped",
  "cancelled",
  "dropped_by_student",
  "dropped_by_school",
]);

export const semester = pgEnum("semester", ["1st", "2nd", "3rd", "summer"]);

export const year_level = pgEnum("year_level", [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
  "6th Year",
]);

export const class_status = pgEnum("class_status", [
  "active",
  "inactive",
  "dropped",
  "completed",
]);

export const enrollment_class_status = pgEnum("enrollment_class_status", [
  "enrolled",
  "dropped",
  "completed",
]);