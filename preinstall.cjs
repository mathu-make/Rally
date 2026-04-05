"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname);
for (const name of ["package-lock.json", "yarn.lock"]) {
  const p = path.join(root, name);
  try {
    fs.unlinkSync(p);
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw e;
    }
  }
}

const ua = process.env.npm_config_user_agent || "";
if (!ua.startsWith("pnpm/")) {
  console.error("Use pnpm instead of npm/yarn for this monorepo.");
  process.exit(1);
}
