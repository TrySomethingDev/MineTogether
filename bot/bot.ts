import tmi, { Client, ChatUserstate } from "tmi.js";
import yaml from "js-yaml";
import fs from "node:fs";

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

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

let path =
  "C:\\Files\\Servers\\PaperServerDev1\\plugins\\TrySomethingDevAmazingPlugin\\config.yml";
const adminName = "TrySomethingDev";

// Called every time a message comes in
const onMessageHandler = (
  channel: string,
  context: tmi.ChatUserstate,
  msg: string,
  self: boolean,
): void => {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  if (
    commandName.toUpperCase() === "!MINECLEAR" &&
    context["display-name"] === adminName
  ) {
    let doc = yaml.load(fs.readFileSync(path, "utf8"));
    doc.ChattersThatWantToPlay = [];
    doc.General.Greeting = msg;
    fs.writeFile(path, yaml.dump(doc), (err) => {
      if (err) {
        console.log(err);
      }

      client.say(target, `Cleared Miner List`);
    });
  }

  // // If the command is known, let's execute it
  // if (commandName === '!dice') {
  //   const num = rollDice();
  //   client.say(target, `You rolled a ${num}`);
  //   console.log(`* Executed ${commandName} command`);
  // } else {
  //   console.log(`* Unknown command ${commandName}`);
  // }

  //   // If the command is known, let's execute it
  // if (commandName === '!Minecraft') {
  //   client.say(target, `The Minecraft Server is...`);
  //   client.say(target, `MC1.TrySomethingDev.com`);
  //   console.log(`* Executed ${commandName} command`);
  // } else {
  //   console.log(`* Unknown command ${commandName}`);
  // }

  // If the command is known, let's execute it
  if (commandName === "!mine") {
    //Add name of sender to ""

    let doc = yaml.load(fs.readFileSync(path, "utf8"));
    if (doc.ChattersThatWantToPlay.includes(context["display-name"])) {
      client.say(
        target,
        context["display-name"] + `, your name is already on the list`,
      );
    } else {
      doc.ChattersThatWantToPlay.push(context["display-name"]);
      doc.General.Greeting = msg;
      fs.writeFile(path, yaml.dump(doc), (err) => {
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
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
};

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
