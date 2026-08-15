import { relations } from "drizzle-orm";
import {
  students,
  school_years,
  sections,
  curriculums,
  enrollments,
  enrollment_classes,
  classes,
} from "../schema";

export const enrollmentRelations = relations(enrollments, ({ one }) => ({
  enrollment_student: one(students, {
    fields: [enrollments.student_id],
    references: [students.id],
  }),
  enrollment_school_year: one(school_years, {
    fields: [enrollments.school_year_id],
    references: [school_years.id],
  }),
  enrollment_section: one(sections, {
    fields: [enrollments.section_id],
    references: [sections.id],
  }),
  enrollment_curriculum: one(curriculums, {
    fields: [enrollments.curriculum_id],
    references: [curriculums.id],
  }),
  enrollment_classes: one(enrollment_classes, {
    fields: [enrollments.id],
    references: [enrollment_classes.enrollment_id],
  }),
}));

// ------------------------------
// ENROLLMENT CLASSES RELATIONS
// ------------------------------
export const enrollmentClassRelations = relations(
  enrollment_classes,
  ({ one }) => ({
    enrollment_class_enrollment: one(enrollments, {
      fields: [enrollment_classes.enrollment_id],
      references: [enrollments.id],
    }),
    enrollment_class_class: one(classes, {
      fields: [enrollment_classes.class_id],
      references: [classes.id],
    }),
  }),
);
