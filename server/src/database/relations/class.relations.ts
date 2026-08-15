import { relations } from "drizzle-orm";
import { teachers, class_schedules, classes, sections } from "../schema";

// -----------------------------------
// CLASSES RELATIONS
// classess has one schedule, one teacher, and one section
// -----------------------------------

export const classScheduleRelations = relations(classes, ({ one }) => ({
  class_schedule: one(class_schedules, {
    fields: [classes.id],
    references: [class_schedules.id],
  }),
}));

export const classTeacherRelations = relations(classes, ({ one }) => ({
  class_teacher: one(teachers, {
    fields: [classes.teacher_id],
    references: [teachers.id],
  }),
}));

export const classSectionsRelations = relations(classes, ({ one }) => ({
  class_section: one(sections, {
    fields: [classes.section_id],
    references: [sections.id],
  }),
}));

// -----------------------------------
// SCHEDULES RELATIONS
// schedule has one class
// -----------------------------------

export const scheduleClassRelations = relations(class_schedules, ({ one }) => ({
  schedule_class: one(classes, {
    fields: [class_schedules.class_id],
    references: [classes.id],
  }),
}));

// -----------------------------------
// SECTIONS RELATIONS
// section has many classes
// -----------------------------------

export const sectionClassRelations = relations(sections, ({ many }) => ({
  section_classes: many(classes),
}));
