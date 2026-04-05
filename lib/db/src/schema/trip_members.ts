import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { memberRoleEnum } from "./enums";
import { trips } from "./trips";

/**
 * People on a trip. `userId` can be linked to Supabase auth later; null until then.
 */
export const tripMembers = pgTable(
  "trip_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tripId: uuid("trip_id")
      .notNull()
      .references(() => trips.id, { onDelete: "cascade" }),
    displayName: text("display_name").notNull(),
    /** Short label for avatars (e.g. "MT"). */
    initials: text("initials").notNull(),
    /** Tailwind-friendly class, e.g. bg-violet-500 */
    avatarColorClass: text("avatar_color_class").notNull(),
    role: memberRoleEnum("role").notNull().default("member"),
    userId: uuid("user_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("trip_members_trip_id_idx").on(table.tripId)],
);

export type TripMemberRow = typeof tripMembers.$inferSelect;
export type NewTripMemberRow = typeof tripMembers.$inferInsert;
