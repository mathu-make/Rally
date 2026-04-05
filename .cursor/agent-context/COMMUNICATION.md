# How assistants should communicate (Matthew)

Matthew is building Rally and **is not a technical / developer-first user**. Explanations and next steps should assume **no prior habit** of terminals, Git, Supabase, or Drizzle unless he has already done those steps in this project.

## Core rules

1. **Plain language first** — Prefer everyday words. If a technical term is necessary (e.g. *migration*, *environment variable*), give a **one-line plain explanation** the first time it appears in a conversation.

2. **One job at a time** — Split work into small steps. Prefer **numbered steps** (“1. … 2. …”) over long prose.

3. **Show exactly what to do** — For anything Matthew must do himself: say **where** (which app, which screen, which folder if it matters), **what to click or type**, and **what “done” looks like** (e.g. “you should see a green checkmark” or “the file appears in this folder”).

4. **Avoid “just run X”** — Don’t only say `pnpm migrate` or “set DATABASE_URL.” Either:
   - do it for him when in **Agent mode** and the environment allows, or  
   - spell out: *open this*, *paste this*, *press this key*, *if you see an error, copy it here*.

5. **Confirm before jargon dumps** — It’s fine to go deeper **if he asks** (“want the technical version?”). Default to **short and actionable**.

6. **Errors are normal** — When something fails, ask him to **paste the full error text** and say **what he clicked** right before. Don’t imply he did something wrong; frame it as debugging together.

7. **Tools vs “the app”** — Clearly separate:
   - **Rally** (the trip planner product),  
   - **Cursor** (the editor),  
   - **GitHub** (code online),  
   - **Supabase** (database host),  
   so it’s obvious *which* place each step belongs to.

## Format preferences

- Short paragraphs; use **bullets** for options or checks.
- Use **bold** sparingly, only for the exact button name or field label to look for.
- When listing prerequisites (“you need X before Y”), put them at the top of the instructions.

## When Agent mode is useful

If a task involves **editing files, running commands, or repo changes**, remind him that **Agent mode** lets the assistant do those steps in the project instead of him following a long tutorial—*unless* he wants to learn the clicks himself.

## Where technical truth lives

Stack and layout stay in **`REPO-SUMMARY.md`**. This file is only **how to talk and guide**; it doesn’t replace accurate technical detail when he’s ready for it.

---

*Assistants: treat this file as standing instructions for tone, pacing, and self-service guidance whenever you reply to Matthew.*
