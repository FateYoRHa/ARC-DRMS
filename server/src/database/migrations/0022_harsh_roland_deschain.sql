CREATE TABLE "teacher_id_counters" (
	"year" integer PRIMARY KEY NOT NULL,
	"last_number" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "curriculum_programs" RENAME TO "curriculum_subjects";--> statement-breakpoint
ALTER TABLE "curriculum_subjects" DROP CONSTRAINT "curriculum_programs_curriculum_id_curriculums_id_fk";
--> statement-breakpoint
ALTER TABLE "curriculum_subjects" DROP CONSTRAINT "curriculum_programs_subject_id_subjects_id_fk";
--> statement-breakpoint
ALTER TABLE "sections" DROP CONSTRAINT "sections_program_id_curriculum_programs_id_fk";
--> statement-breakpoint
ALTER TABLE "curriculums" ADD CONSTRAINT "curriculums_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curriculum_subjects" ADD CONSTRAINT "curriculum_subjects_curriculum_id_curriculums_id_fk" FOREIGN KEY ("curriculum_id") REFERENCES "public"."curriculums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curriculum_subjects" ADD CONSTRAINT "curriculum_subjects_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sections" ADD CONSTRAINT "sections_program_id_curriculum_subjects_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."curriculum_subjects"("id") ON DELETE no action ON UPDATE no action;