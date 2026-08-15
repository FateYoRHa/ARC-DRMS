import { relations } from "drizzle-orm";
import { classes, teachers } from "../schema";

export const teacherClassRelations = relations(teachers, ({ many }) => ({
  teacher_classes: many(classes),
}));
