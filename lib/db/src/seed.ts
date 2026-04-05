import { db, pool } from "./index";
import { trips, tripMembers } from "./schema";
import { SEED_TRIP, SEED_MEMBERS, SEED_TRIP_ID } from "./seed-data";

/**
 * Idempotent: safe to re-run. Inserts the seeded trip and your six members
 * if those primary keys are not already present.
 *
 * Usage (from repo root, with DATABASE_URL set to Supabase or local Postgres):
 *   pnpm --filter @workspace/db run seed
 */
async function main() {
  await db
    .insert(trips)
    .values({
      id: SEED_TRIP.id,
      name: SEED_TRIP.name,
      notes: SEED_TRIP.notes,
    })
    .onConflictDoNothing({ target: trips.id });

  for (const m of SEED_MEMBERS) {
    await db
      .insert(tripMembers)
      .values({
        id: m.id,
        tripId: SEED_TRIP_ID,
        displayName: m.displayName,
        initials: m.initials,
        avatarColorClass: m.avatarColorClass,
        role: m.role,
      })
      .onConflictDoNothing({ target: tripMembers.id });
  }

  console.info(`Seed finished for trip ${SEED_TRIP_ID} (${SEED_MEMBERS.length} members).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
