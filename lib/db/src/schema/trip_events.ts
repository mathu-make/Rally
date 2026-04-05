import { index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { trips } from "./trips";

/**
 * Append-only audit log for trip-level actions (create/join/book/delete, etc.).
 */
export const tripEvents = pgTable(
  "trip_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tripId: uuid("trip_id")
      .notNull()
      .references(() => trips.id, { onDelete: "cascade" }),
    /** Nullable for system-like events. */
    actorMemberId: uuid("actor_member_id"),
    activityId: uuid("activity_id"),
    eventType: text("event_type").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown> | null>(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("trip_events_trip_id_idx").on(table.tripId),
    index("trip_events_trip_created_idx").on(table.tripId, table.createdAt),
  ],
);

export type TripEventRow = typeof tripEvents.$inferSelect;
export type NewTripEventRow = typeof tripEvents.$inferInsert;
