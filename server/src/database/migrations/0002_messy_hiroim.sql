CREATE TYPE "public"."entrance_status" AS ENUM('incoming_first_year', 'transferee', 'returning_student');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'for_id', 'for_approval', 'for_encoding', 'registered');--> statement-breakpoint
CREATE TABLE "admissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" integer,
	"entrance_status" "entrance_status" DEFAULT 'incoming_first_year',
	"first_name" varchar NOT NULL,
	"middle_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone_number" integer NOT NULL,
	"house_number" integer,
	"street" varchar NOT NULL,
	"barangay" text NOT NULL,
	"city" text NOT NULL,
	"province" text NOT NULL,
	"zip_code" integer NOT NULL,
	"country" text NOT NULL,
	"previous_school" text,
	"year_graduated" integer NOT NULL,
	"status" "status" DEFAULT 'pending',
	"isActive" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "admissions_application_id_unique" UNIQUE("application_id")
);
