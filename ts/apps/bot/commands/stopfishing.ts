import { db, schema } from "@packages/db";
import { channelName } from "../";
import { eq } from "drizzle-orm";
import { commandBase } from "../commandBase";

commandBase.registerCommand("stopfishing", async ({ client, user }) => {
  const userFishingSpot = await db.query.fishingSpots.findFirst({
    where: eq(schema.fishingSpots.occupantId, user.id),
  });

  if (!userFishingSpot) {
    return client.say(
      channelName,
      `@${user.name}, you do not currently have an active fishing spot.`,
    );
  }

  // Update as no longer being used
  await db
    .update(schema.fishingSpots)
    .set({
      isOccupied: false,
      occupantId: null,
    })
    .where(eq(schema.fishingSpots.id, userFishingSpot.id));

  // TODO: Notify api to notify game server

  // Send message to chat
  return client.say(channelName, `@${user.name} is no longer fishing.`);
});
