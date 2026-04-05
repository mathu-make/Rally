import { relations } from "drizzle-orm";
import { trips } from "./trips";
import { tripMembers } from "./trip_members";
import { activities } from "./activities";
import { activityParticipants } from "./activity_participants";
import { tripEvents } from "./trip_events";

export const tripsRelations = relations(trips, ({ many }) => ({
  members: many(tripMembers),
  activities: many(activities),
  events: many(tripEvents),
}));

export const tripMembersRelations = relations(tripMembers, ({ one, many }) => ({
  trip: one(trips, { fields: [tripMembers.tripId], references: [trips.id] }),
  participantLinks: many(activityParticipants),
}));

export const activitiesRelations = relations(activities, ({ one, many }) => ({
  trip: one(trips, { fields: [activities.tripId], references: [trips.id] }),
  createdByMember: one(tripMembers, {
    fields: [activities.createdByMemberId],
    references: [tripMembers.id],
    relationName: "activityCreatedBy",
  }),
  bookedByMember: one(tripMembers, {
    fields: [activities.bookedByMemberId],
    references: [tripMembers.id],
    relationName: "activityBookedBy",
  }),
  participantLinks: many(activityParticipants),
}));

export const activityParticipantsRelations = relations(
  activityParticipants,
  ({ one }) => ({
    activity: one(activities, {
      fields: [activityParticipants.activityId],
      references: [activities.id],
    }),
    member: one(tripMembers, {
      fields: [activityParticipants.memberId],
      references: [tripMembers.id],
    }),
  }),
);

export const tripEventsRelations = relations(tripEvents, ({ one }) => ({
  trip: one(trips, { fields: [tripEvents.tripId], references: [trips.id] }),
}));
