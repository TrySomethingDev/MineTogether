import { client } from "tmi.js";
import { commandBase, PATH } from "../bot";
import yaml from "js-yaml";
import fs from "node:fs";

commandBase.registerCommand("mineclear", (client, context, args) => {
  let doc = yaml.load(fs.readFileSync(PATH, "utf8"));
  doc.ChattersThatWantToPlay = [];
  doc.General.Greeting = msg;
  fs.writeFile(PATH, yaml.dump(doc), (err) => {
    if (err) {
      console.log(err);
    }

    client.say(target, `Cleared Miner List`);
  });
});
