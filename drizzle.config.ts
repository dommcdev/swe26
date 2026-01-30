import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts", // Where the blueprint is
  out: "./drizzle", // Where to put the generated SQL files
  dialect: "sqlite", // Tells Drizzle to speak the SQLite language
  dbCredentials: {
    url: "file:sqlite.db", // Where the actual data is
  },
});
