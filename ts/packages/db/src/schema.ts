import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  minecraftName: text("minecraft_username"),
  minecraftUUID: text("minecraft_uuid"),
});

export const fishingSpots = sqliteTable("fishing_spots", {
  // random id
  id: text("id").notNull().primaryKey(),
  locationX: integer("location_x").notNull(),
  locationY: integer("location_y").notNull(),
  locationZ: integer("location_z").notNull(),
  facing: text("facing", {
    enum: ["north", "south", "east", "west"],
  }),
  isOccupied: integer("is_occupied", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  occupantId: text("occupant_id").references(() => users.id),
});
