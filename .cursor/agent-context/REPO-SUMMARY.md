# Rally — repository summary

Last updated: 2026-04-04

## What this is

**Rally** is an app that allows users to easily build itineraries for group trips.

Technically **Rally** is a **pnpm monorepo** of TypeScript packages and Vite/React frontends, with a small **Express** API, **OpenAPI-driven codegen** (Orval), and **Drizzle ORM** scaffolding. Root `package.json` names the workspace `workspace` (private, MIT). There is no top-level `README.md` in the tree surveyed.

## Tooling and constraints

- **Package manager:** **pnpm only.** `preinstall.cjs` removes `package-lock.json` / `yarn.lock` if present and exits if install is not run under pnpm.
- **Build:** `pnpm build` runs `typecheck` then `pnpm -r --if-present run build` under artifacts/scripts packages that define `build`.
- **Typecheck:** `tsc --build` for shared libs, then filtered typecheck for `./artifacts/**` and `./scripts`.
- **Shared dependency versions:** `pnpm-workspace.yaml` defines a **catalog** (React 19, Vite 7, Tailwind 4, Drizzle, Zod, TanStack Query, etc.).

## Layout

| Area | Role |
|------|------|
| `lib/` | Shared libraries consumed by apps |
| `artifacts/` | Runnable applications (API, UIs) |
| `scripts/` | Small CLI-style TypeScript utilities |

### `lib/` packages

- **`@workspace/api-spec`:** `openapi.yaml` (OpenAPI 3.1) plus **Orval** config. **Codegen:** `pnpm run codegen` — emits into `lib/api-client-react/src/generated` and `lib/api-zod/src/generated`. The OpenAPI **`info.title` must remain `Api`** (Orval paths and transformers assume this).
- **`@workspace/api-client-react`:** Generated **React Query** hooks client with a **`custom-fetch.ts`** mutator; base URL `/api`.
- **`@workspace/api-zod`:** Generated **Zod** schemas/types from the same OpenAPI spec (for validation/shape sharing with the server).
- **`@workspace/db`:** **Drizzle** package (`drizzle.config.ts`). **`src/schema/index.ts` is currently an empty export** with commented templates for tables + `drizzle-zod` insert schemas — no live tables yet.

### `artifacts/` applications

- **`@workspace/api-server`:** **Express 5** server bundled with **esbuild**, **Pino** logging, **cors** / **cookie-parser**. Depends on `@workspace/api-zod` and `@workspace/db`. **Requires `PORT`** at runtime. Exposes API under the spec’s server base (`/api` in `openapi.yaml`); current spec: **`GET /healthz`** → `HealthStatus`.
- **`@workspace/trip-planner`:** **Vite** SPA — **React 19**, **wouter** routing, **TanStack Query**, large **shadcn-style** Radix UI set. **Domain:** trip/activity planning UI with **profile picker**, **activity board**, **calendar**; **seed data in localStorage** (`initializeSeedData` on app mount). Uses `@workspace/api-client-react` for API types/hooks. Routes: `/` → redirect `/board`, `/calendar`, plus not-found.
- **`@workspace/mockup-sandbox`:** Another **Vite** app (similar modern React/UI stack); treated as a sandbox/mockup per package name.

### `scripts/`

- **`@workspace/scripts`:** Example `hello` script via **tsx**; has its own `typecheck`.

## API surface (today)

OpenAPI defines a minimal **health** tag and **`HealthStatus`** schema (`status: string`). Extending the API should follow: edit `lib/api-spec/openapi.yaml` → run Orval codegen → implement routes in `artifacts/api-server` using shared Zod/types as needed.

## Mental model for agents

1. **Spec-first:** API shape lives in `lib/api-spec/openapi.yaml`; clients and Zod are generated, not hand-written in those folders (regenerate after spec changes).
2. **Apps vs libs:** Production-ish app code under `artifacts/`; cross-cutting types/clients/db under `lib/`.
3. **Trip planner** is largely **client-side demo state** (localStorage seed) while still wired for the generated API client for future backend integration.

## This folder

`.cursor/agent-context/` is **assistant-maintained context** — notes, decisions, and summaries to speed up future sessions without re-walking the whole tree.
