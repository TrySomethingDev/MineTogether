import tmi, { Client, ChatUserstate } from "tmi.js";
import { CommandBase } from "./commandBase";

export const PATH =
  "C:\\Files\\Servers\\PaperServerDev1\\plugins\\TrySomethingDevAmazingPlugin\\config.yml";
export const ADMIN_NAME = "TrySomethingDev";

// Define configuration options
const opts = {
  identity: {
    username: "trysomethingdev",
    password: "OATH TOKEN HERE",
  },
  channels: ["trysomethingdev"],
};

export const channelName = opts.channels[0];

// Create a client with our options
const client = new tmi.client(opts);
client.connect();
export type ClientType = Client;

export const commandBase = new CommandBase(client);

export interface MessageHandler {
  (channel: string, context: ChatUserstate, msg: string, self: boolean): void;
}

// Called every time a message comes in
const onMessageHandler: MessageHandler = (
  channel,
  context,
  msg,
  self,
): void => {
  if (self) return; // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim().toLowerCase();

  const commandExists = commandBase.findCommand(commandName);
  if (!commandExists) return;

  commandBase.runCommand(commandName, client, context, msg.split(" "));

  console.log(`* Executed ${commandName} command`);
};

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr}:${port}`);
}
