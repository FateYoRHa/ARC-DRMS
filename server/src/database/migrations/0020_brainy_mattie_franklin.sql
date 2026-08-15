CREATE TYPE "public"."student_status" AS ENUM('active', 'graduated', 'transferred');--> statement-breakpoint
ALTER TYPE "public"."status" RENAME TO "admission_status";--> statement-breakpoint
ALTER TABLE "students" RENAME COLUMN "guadian_phone_number" TO "guardian_phone_number";--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "status" "student_status" DEFAULT 'active';