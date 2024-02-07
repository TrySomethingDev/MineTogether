import tmi, { Client, ChatUserstate } from "tmi.js";
import yaml from "js-yaml";
import fs from "node:fs";
import { CommandBase } from "./commandBase";

export const PATH =
  "C:\\Files\\Servers\\PaperServerDev1\\plugins\\TrySomethingDevAmazingPlugin\\config.yml";
const ADMIN_NAME = "TrySomethingDev";

// Define configuration options
const opts = {
  identity: {
    username: "trysomethingdev",
    password: "OATH TOKEN HERE",
  },
  channels: ["trysomethingdev"],
};

// Create a client with our options
const client = new tmi.client(opts);
export type ClientType = Client;

export const commandBase = new CommandBase(client);

// Connect to Twitch:
client.connect();

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

  commandBase.runCommand(commandName, [msg]);

  if (
    commandName.toUpperCase() === "!MINECLEAR" &&
    context["display-name"] === ADMIN_NAME
  ) {
  }

  // If the command is known, let's execute it
  if (commandName === "!mine") {
    //Add name of sender to ""

    let doc = yaml.load(fs.readFileSync(PATH, "utf8"));
    if (doc.ChattersThatWantToPlay.includes(context["display-name"])) {
      client.say(
        target,
        context["display-name"] + `, your name is already on the list`,
      );
    } else {
      doc.ChattersThatWantToPlay.push(context["display-name"]);
      doc.General.Greeting = msg;
      fs.writeFile(PATH, yaml.dump(doc), (err) => {
        if (err) {
          console.log(err);
        }
        client.say(
          target,
          context["display-name"] + `, your name has been added to the list.`,
        );
      });
    }

    console.log(`* Executed ${commandName} command`);
  }
};

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
