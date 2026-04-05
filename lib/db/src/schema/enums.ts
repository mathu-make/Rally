import { pgEnum } from "drizzle-orm/pg-core";

export const memberRoleEnum = pgEnum("member_role", ["organizer", "member"]);

export const activityStatusEnum = pgEnum("activity_status", [
  "open",
  "booked",
  "cancelled",
  "full",
]);
