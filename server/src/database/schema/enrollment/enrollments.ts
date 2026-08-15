import { pgTable, serial, integer, timestamp, text } from "drizzle-orm/pg-core";
import {
  students,
  school_years,
  sections,
  teachers,
  curriculums,
} from "../../schema";
import { enrollment_status, semester, year_level } from "../enums";
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  student_id: integer("student_id")
    .references(() => students.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .unique()
    .notNull(),
  school_year_id: integer("school_year_id")
    .references(() => school_years.id)
    .notNull(),
  semester: semester("semester").notNull(),
  section_id: integer("section_id")
    .references(() => sections.id)
    .notNull(),
  curriculum_id: integer("curriculum_id")
    .references(() => curriculums.id)
    .notNull(),
  year_level: year_level("year_level").notNull(),
  status: enrollment_status("status").default("approved"),
  enrolledAt: timestamp("enrolled_at"),
  graduatedAt: timestamp("graduated_at"),
  droppedAt: timestamp("dropped_at"),
  cancelledAt: timestamp("cancelled_at"),
  cancellation_reason: text("cancellation_reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Enrollment = typeof enrollments.$inferSelect;
