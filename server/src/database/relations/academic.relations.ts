import { relations } from "drizzle-orm";

import {
  programs,
  schools,
  curriculums,
  school_years,
  subjects,
} from "../schema";
import { curriculum_subjects } from "../schema/academic/curriculum_subjects";

export const programsRelations = relations(programs, ({ one, many }) => ({
  program_school: one(schools, {
    fields: [programs.school_id],
    references: [schools.id],
  }),
  program_curriculums: many(curriculums),
}));

export const schoolsRelations = relations(schools, ({ many }) => ({
  school_programs: many(programs),
  curriculums_year: many(curriculums),
}));

// ------------------
// CURRICULUM RELATIONS
// ------------------
export const curriculumRelations = relations(curriculums, ({ one, many }) => ({
  curriculum_school: one(schools, {
    fields: [curriculums.school_id],
    references: [schools.id],
  }),
  curriculum: many(curriculum_subjects),// curriculum has many curriculum_subjects
  curriculum_effective_year: one(school_years, {
    fields: [curriculums.effective_school_year_id],
    references: [school_years.id],
  }),
  curriculum_subjects: many(subjects),
}));
