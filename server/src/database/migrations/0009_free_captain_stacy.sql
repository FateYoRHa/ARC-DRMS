CREATE TYPE "public"."sexes" AS ENUM('male', 'female');--> statement-breakpoint
ALTER TABLE "admissions" ADD COLUMN "birth_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "admissions" ADD COLUMN "sex" "sexes" NOT NULL;--> statement-breakpoint
ALTER TABLE "admissions" ADD COLUMN "guardian" text NOT NULL;--> statement-breakpoint
ALTER TABLE "admissions" ADD COLUMN "guadian_phone_number" varchar NOT NULL;