import { db, schema } from "@packages/db";
import { channelName } from "../";
import { eq } from "drizzle-orm";
import { commandBase } from "../commandBase";

commandBase.registerCommand(
  "startfishing",
  async ({ client, context, user }) => {
    const availableSpots = await db.query.fishingSpots.findMany({
      where: eq(schema.fishingSpots.isOccupied, false),
    });

    if (availableSpots.length === 0) {
      return client.say(
        channelName,
        `Sorry ${user.name}, there are no available fishing spots.`,
      );
    }

    // Pick a random spot
    const spot =
      availableSpots[Math.floor(Math.random() * availableSpots.length)];
    if (!spot) return;

    // Update as being used
    await db
      .update(schema.fishingSpots)
      .set({
        isOccupied: true,
        occupantId: user.id,
      })
      .where(eq(schema.fishingSpots.id, spot.id));

    // TODO: Notify api to notify game server

    // Send message to chat
    return client.say(
      channelName,
      `@${user.name} has started fishing at ${spot.locationX}, ${spot.locationY}, ${spot.locationZ}`,
    );
  },
);
