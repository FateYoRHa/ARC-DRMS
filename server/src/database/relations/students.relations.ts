import { relations } from "drizzle-orm";

import { admissions } from "../schema/admissions";
import { students } from "../schema/students";

export const admissionsRelations = relations(admissions, ({ one }) => ({
  student: one(students, {
    fields: [admissions.id],
    references: [students.application_id],
  }),
}));

export const studentRelations = relations(students, ({ one }) => ({
  admission: one(admissions, {
    fields: [students.application_id],
    references: [admissions.id],
  }),
}));
