import { index, pgTable, text, timestamp, uuid, date } from "drizzle-orm/pg-core";
import { activityStatusEnum } from "./enums";
import { trips } from "./trips";
import { tripMembers } from "./trip_members";

export const activities = pgTable(
  "activities",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tripId: uuid("trip_id")
      .notNull()
      .references(() => trips.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    /** Calendar day in the trip's local convention (YYYY-MM-DD). */
    activityDate: date("activity_date", { mode: "string" }).notNull(),
    startTime: text("start_time").notNull(),
    endTime: text("end_time").notNull(),
    location: text("location").notNull().default(""),
    status: activityStatusEnum("status").notNull().default("open"),
    createdByMemberId: uuid("created_by_member_id")
      .notNull()
      .references(() => tripMembers.id, { onDelete: "restrict" }),
    bookedByMemberId: uuid("booked_by_member_id").references(
      () => tripMembers.id,
      { onDelete: "set null" },
    ),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    /** Soft delete; null = active. */
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [
    index("activities_trip_id_idx").on(table.tripId),
    index("activities_trip_date_idx").on(table.tripId, table.activityDate),
  ],
);

export type ActivityRow = typeof activities.$inferSelect;
export type NewActivityRow = typeof activities.$inferInsert;
