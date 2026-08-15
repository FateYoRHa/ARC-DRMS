import { relations } from "drizzle-orm";

import { programs, schools, curriculum, school_years } from "../schema";

export const programsRelations = relations(programs, ({ one }) => ({
  program_school: one(schools, {
    fields: [programs.school_id],
    references: [schools.id],
  }),
}));

export const schoolsRelations = relations(schools, ({ many }) => ({
  school_programs: many(programs),
}));

// ------------------
// CURRICULUM RELATIONS
// ------------------
export const curriculumSchoolRelations = relations(curriculum, ({ one }) => ({
  curriculum_school: one(schools, {
    fields: [curriculum.school],
    references: [schools.id],
  }),
}));

export const curriculumYearRelations = relations(curriculum, ({ one }) => ({
  curriculum_effective_year: one(school_years, {
    fields: [curriculum.effective_school_year_id],
    references: [school_years.id],
  }),
}));

export const schoolYearRelations = relations(school_years, ({ many }) => ({
  curriculums_year: many(curriculum),
}));
