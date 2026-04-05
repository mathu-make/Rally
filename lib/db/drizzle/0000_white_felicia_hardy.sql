CREATE TYPE "public"."activity_status" AS ENUM('open', 'booked', 'cancelled', 'full');--> statement-breakpoint
CREATE TYPE "public"."member_role" AS ENUM('organizer', 'member');--> statement-breakpoint
CREATE TABLE "trips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trip_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"display_name" text NOT NULL,
	"initials" text NOT NULL,
	"avatar_color_class" text NOT NULL,
	"role" "member_role" DEFAULT 'member' NOT NULL,
	"user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"activity_date" date NOT NULL,
	"start_time" text NOT NULL,
	"end_time" text NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"status" "activity_status" DEFAULT 'open' NOT NULL,
	"created_by_member_id" uuid NOT NULL,
	"booked_by_member_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "activity_participants" (
	"activity_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	CONSTRAINT "activity_participants_activity_id_member_id_pk" PRIMARY KEY("activity_id","member_id")
);
--> statement-breakpoint
CREATE TABLE "trip_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"actor_member_id" uuid,
	"activity_id" uuid,
	"event_type" text NOT NULL,
	"payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "trip_members" ADD CONSTRAINT "trip_members_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_created_by_member_id_trip_members_id_fk" FOREIGN KEY ("created_by_member_id") REFERENCES "public"."trip_members"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_booked_by_member_id_trip_members_id_fk" FOREIGN KEY ("booked_by_member_id") REFERENCES "public"."trip_members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_participants" ADD CONSTRAINT "activity_participants_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_participants" ADD CONSTRAINT "activity_participants_member_id_trip_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."trip_members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_events" ADD CONSTRAINT "trip_events_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "trip_members_trip_id_idx" ON "trip_members" USING btree ("trip_id");--> statement-breakpoint
CREATE INDEX "activities_trip_id_idx" ON "activities" USING btree ("trip_id");--> statement-breakpoint
CREATE INDEX "activities_trip_date_idx" ON "activities" USING btree ("trip_id","activity_date");--> statement-breakpoint
CREATE INDEX "trip_events_trip_id_idx" ON "trip_events" USING btree ("trip_id");--> statement-breakpoint
CREATE INDEX "trip_events_trip_created_idx" ON "trip_events" USING btree ("trip_id","created_at");