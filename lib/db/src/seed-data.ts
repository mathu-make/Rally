/** Stable ids so you can reference this trip and members from SQL or future API code. */
export const SEED_TRIP_ID = "6f2c9a1b-8d7e-4c3b-9a1f-2e4d6b8c0a10";

export const SEED_TRIP = {
  id: SEED_TRIP_ID,
  name: "Planned trip",
  notes: "Seeded trip — rename or extend in Supabase as you like.",
} as const;

export const SEED_MEMBERS = [
  {
    id: "6f2c9a1b-8d7e-4c3b-9a1f-2e4d6b8c0a11",
    displayName: "Matthew",
    initials: "MT",
    avatarColorClass: "bg-violet-500",
    role: "organizer" as const,
  },
  {
    id: "6f2c9a1b-8d7e-4c3b-9a1f-2e4d6b8c0a12",
    displayName: "Meg",
    initials: "ME",
    avatarColorClass: "bg-rose-500",
    role: "member" as const,
  },
  {
    id: "6f2c9a1b-8d7e-4c3b-9a1f-2e4d6b8c0a13",
    displayName: "Sis",
    initials: "SI",
    avatarColorClass: "bg-blue-500",
    role: "member" as const,
  },
  {
    id: "6f2c9a1b-8d7e-4c3b-9a1f-2e4d6b8c0a14",
    displayName: "Guev",
    initials: "GV",
    avatarColorClass: "bg-emerald-500",
    role: "member" as const,
  },
  {
    id: "6f2c9a1b-8d7e-4c3b-9a1f-2e4d6b8c0a15",
    displayName: "Tray",
    initials: "TR",
    avatarColorClass: "bg-amber-500",
    role: "member" as const,
  },
  {
    id: "6f2c9a1b-8d7e-4c3b-9a1f-2e4d6b8c0a16",
    displayName: "Rigo",
    initials: "RG",
    avatarColorClass: "bg-indigo-500",
    role: "member" as const,
  },
] as const;
