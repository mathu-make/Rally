import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const trips = pgTable("trips", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  /** Free-form notes (destination, dates, etc.); optional. */
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Trip = typeof trips.$inferSelect;
export type NewTrip = typeof trips.$inferInsert;
