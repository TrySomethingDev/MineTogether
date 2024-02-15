import tmi, { Client, ChatUserstate } from "tmi.js";
import { CommandBase, commandBase } from "./commandBase";
import { db, schema } from "@packages/db";
import { eq } from "drizzle-orm";
import fs from "node:fs";
import "./commands/startfishing";

export const PATH =
  "C:\\Files\\Servers\\PaperServerDev1\\plugins\\TrySomethingDevAmazingPlugin\\config.yml";
export const ADMIN_NAME = "TrySomethingDev";
const identityToken = JSON.parse(
  fs.readFileSync("../../config.json", "utf-8"),
).token;

// Define configuration options
const opts = {
  identity: {
    username: "trysomethingdev",
    password: identityToken,
  },
  channels: ["trysomethingdev"],
} satisfies {
  identity: {
    username: string;
    password: string;
  };
  channels: string[];
};

export const channelName = opts.channels[0] as string;

// Create a client with our options
export const client = new tmi.client(opts);
client.connect();
export type ClientType = Client;

export interface MessageHandler {
  (channel: string, context: ChatUserstate, msg: string, self: boolean): void;
}

// Called every time a message comes in
const onMessageHandler: MessageHandler = async (
  channel,
  context,
  msg,
  self,
) => {
  if (self) return; // Ignore messages from the bot
  if (!context["user-id"] || !context.username) return;

  const userExists = await db.query.users.findFirst({
    where: eq(schema.users.id, context["user-id"]),
  });

  if (!userExists) {
    await db.insert(schema.users).values({
      id: context["user-id"],
      name: context.username,
    });
  } else if (userExists.name !== context.username) {
    await db
      .update(schema.users)
      .set({
        name: context.username,
      })
      .where(eq(schema.users.id, context["user-id"]));
  }

  // Remove whitespace from chat message
  let commandName = msg.trim().toLowerCase();

  console.log("list", commandBase.commandList);

  if(!commandName.startsWith("!")) return;
  commandName = commandName.replace("!", "");

  const commandExists = commandBase.findCommand(commandName);
  if (!commandExists) return;

  commandBase.runCommand(commandName, {
    client,
    context,
    args: msg.split(" "),
    user: {
      id: context["user-id"],
      name: context.username,
      minecraftName: userExists?.minecraftName ?? null,
      minecraftUUID: userExists?.minecraftUUID ?? null,
    },
  });

  console.log(`* Executed ${commandName} command`);
};

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr}:${port}`);
}
