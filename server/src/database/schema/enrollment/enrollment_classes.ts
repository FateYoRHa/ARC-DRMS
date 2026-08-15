import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { enrollments, classes } from "../../schema";
import { enrollment_class_status } from "../enums";
export const enrollment_classes = pgTable("enrollment_classes", {
  id: serial("id").primaryKey(),
  enrollment_id: integer("enrollment_id").references(() => enrollments.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }).notNull(),
  class_id: integer("class_id").references(() => classes.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }).notNull(),
  status: enrollment_class_status("status").default("enrolled"),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type EnrollmentClass = typeof enrollment_classes.$inferSelect;