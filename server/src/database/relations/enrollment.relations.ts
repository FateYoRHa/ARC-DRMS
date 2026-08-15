import { relations } from "drizzle-orm";
import {enrollments} from "../schema";
import { students, school_years, sections, curriculums } from "../schema";

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
}));
