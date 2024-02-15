import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

const users = sqliteTable("users", {
  id: text("id"),
  name: text("name"),
  minecraftName: text("minecraft_username"),
  minecraftUUID: text("minecraft_uuid"),
});
