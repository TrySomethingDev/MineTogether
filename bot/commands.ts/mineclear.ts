import { client } from "tmi.js";
import { ADMIN_NAME, channelName, commandBase, PATH } from "../bot";
import yaml from "js-yaml";
import fs from "node:fs";

commandBase.registerCommand("mineclear", (client, context, args) => {
  if (context["display-name"] !== ADMIN_NAME) return;
  let doc = yaml.load(fs.readFileSync(PATH, "utf8"));
  doc.ChattersThatWantToPlay = [];
  fs.writeFile(PATH, yaml.dump(doc), (err) => {
    if (err) {
      console.log(err);
    }

    client.say(channelName, `Cleared Miner List`);
  });
});
