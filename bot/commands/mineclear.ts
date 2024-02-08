import { ADMIN_NAME, channelName, commandBase, PATH } from "../bot";
import yaml from "js-yaml";
import fs from "node:fs";

commandBase.registerCommand("mineclear", (client, context, args) => {
  if (context["display-name"] !== ADMIN_NAME) return;
  const doc = yaml.load(fs.readFileSync(PATH, "utf8")) as {
    ChattersThatWantToPlay: string[];
  };
  doc.ChattersThatWantToPlay = [];
  fs.writeFile(PATH, yaml.dump(doc), (err) => {
    if (err) {
      console.log(err);
    }

    client.say(channelName, `Cleared Miner List`);
  });
});
