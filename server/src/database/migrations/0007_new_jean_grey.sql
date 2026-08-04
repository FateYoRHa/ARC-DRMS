ALTER TABLE "user_sessions" ALTER COLUMN "refresh_token" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_sessions" ALTER COLUMN "expires_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "user_sessions" ALTER COLUMN "last_used_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "user_sessions" ALTER COLUMN "last_used_at" SET DEFAULT now();