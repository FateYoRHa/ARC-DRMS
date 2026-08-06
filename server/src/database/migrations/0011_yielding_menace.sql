ALTER TABLE "students" ALTER COLUMN "student_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "birth_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "sex" "sexes" NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "email" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "phone_number" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "guardian" text NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "guadian_phone_number" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "house_number" varchar;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "street" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "barangay" text NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "province" text NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "zip_code" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "country" text NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "nationality" text NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "isActive" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "updated_at" timestamp DEFAULT now();