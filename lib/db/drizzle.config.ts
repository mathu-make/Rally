import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

/**
 * Paths are relative to this package root so drizzle-kit's glob resolver
 * works on Windows (absolute paths are not globbed correctly).
 */
export default defineConfig({
  schema: [
    "src/schema/enums.ts",
    "src/schema/trips.ts",
    "src/schema/trip_members.ts",
    "src/schema/activities.ts",
    "src/schema/activity_participants.ts",
    "src/schema/trip_events.ts",
    "src/schema/relations.ts",
  ],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
