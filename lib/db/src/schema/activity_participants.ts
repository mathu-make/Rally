import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { activities } from "./activities";
import { tripMembers } from "./trip_members";

export const activityParticipants = pgTable(
  "activity_participants",
  {
    activityId: uuid("activity_id")
      .notNull()
      .references(() => activities.id, { onDelete: "cascade" }),
    memberId: uuid("member_id")
      .notNull()
      .references(() => tripMembers.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.activityId, table.memberId] })],
);

export type ActivityParticipantRow =
  typeof activityParticipants.$inferSelect;
export type NewActivityParticipantRow =
  typeof activityParticipants.$inferInsert;
