import { relations } from "drizzle-orm";
import {
  teachers,
  class_schedules,
  classes,
  sections,
  enrollment_classes,
} from "../schema";

// -----------------------------------
// CLASSES RELATIONS
// classess has one schedule, one teacher, and one section
// -----------------------------------

export const classRelations = relations(classes, ({ one }) => ({
  class_schedule: one(class_schedules, {
    fields: [classes.id],
    references: [class_schedules.id],
  }),
  class_teacher: one(teachers, {
    fields: [classes.teacher_id],
    references: [teachers.id],
  }),
  class_section: one(sections, {
    fields: [classes.section_id],
    references: [sections.id],
  }),
  enrollment_class: one(enrollment_classes, {
    fields: [classes.id],
    references: [enrollment_classes.class_id],
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
