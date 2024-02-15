import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { schema as dbSchema } from "./src/schema";

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, {
  schema: dbSchema,
});

export const schema = dbSchema;
