CREATE TABLE "user_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" uuid NOT NULL,
	"user_id" integer NOT NULL,
	"refresh_token" varchar NOT NULL,
	"user_agent" varchar,
	"ip_address" varchar NOT NULL,
	"expires_at" date NOT NULL,
	"last_used_at" date DEFAULT now(),
	"revoked_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_sessions_session_id_unique" UNIQUE("session_id"),
	CONSTRAINT "user_sessions_refresh_token_unique" UNIQUE("refresh_token")
);
--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;