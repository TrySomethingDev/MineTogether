import { PATH, channelName, commandBase } from "../index";
import fs from "node:fs";
import yaml from "js-yaml";

commandBase.registerCommand("mine", ({ client, context, user }) => {
  if (!context["display-name"]) return;

  const doc = yaml.load(fs.readFileSync(PATH, "utf8")) as {
    ChattersThatWantToPlay: string[];
  };
  if (!doc.ChattersThatWantToPlay.includes(context["display-name"])) {
    doc.ChattersThatWantToPlay.push(context["display-name"]);
    return fs.writeFile(PATH, yaml.dump(doc), (err) => {
      if (err) {
        console.log(err);
      }
      client.say(
        channelName,
        context["display-name"] + `, your name has been added to the list.`,
      );
    });
  }
  return client.say(
    channelName,
    context["display-name"] + `, your name is already on the list`,
  );
});
