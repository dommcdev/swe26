import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const isProduction = process.env.NODE_ENV === "production";

// We create a "global" variable to hold our client
// This is a common pattern to persist the connection across hot-reloads
const globalForDb = global as unknown as { client: any };

// Check if TURSO_DATABASE_URL is present in .env; throw an error if it isn't
const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  throw new Error("TURSO_DATABASE_URL is missing from .env");
}

export const client =
  globalForDb.client ||
  createClient({
    url: url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

// If we aren't in production, save the client to the global object
if (!isProduction) globalForDb.client = client;

export const db = drizzle(client, { schema });

// The following can be used if we want to sync our local dbs to turso
// const client = createClient({
//   url: "file:local.db",
//   syncUrl: process.env.TURSO_DATABASE_URL,
//   authToken: process.env.TURSO_AUTH_TOKEN,
//   syncInterval: 60, // Sync every minute
// });
