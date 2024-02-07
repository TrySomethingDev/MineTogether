import { channelName, commandBase } from "../bot";
import fs from "node:fs";
import yaml from "js-yaml";

commandBase.registerCommand("mine", (client, context, args) => {
  //Add name of sender to ""

  let doc = yaml.load(fs.readFileSync(PATH, "utf8"));
  if (doc.ChattersThatWantToPlay.includes(context["display-name"])) {
    client.say(
      channelName,
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
});
