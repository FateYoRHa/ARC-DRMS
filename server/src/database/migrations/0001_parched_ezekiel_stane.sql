CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" integer,
	"first_name" varchar NOT NULL,
	"middle_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"student_id" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "students_application_id_unique" UNIQUE("application_id"),
	CONSTRAINT "students_student_id_unique" UNIQUE("student_id")
);
