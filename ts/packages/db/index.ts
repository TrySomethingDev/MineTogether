import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schemas from "./src/schema";
import fs from "node:fs";
const configJson = JSON.parse(fs.readFileSync("../../config.json", "utf-8"));

const sqlite = new Database(configJson.db);

export const db = drizzle(sqlite, {
  schema: schemas,
});

export const schema = schemas;
