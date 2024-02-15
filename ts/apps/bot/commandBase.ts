import { ChatUserstate } from "tmi.js";
import type { ClientType } from "./index";
import { schema } from "@packages/db/src/schema";

type CommandData = {
  client: ClientType;
  context: ChatUserstate;
  args: string[];
  user: typeof schema.users.$inferSelect;
};

export class CommandBase {
  public client = {} as ClientType;
  private commands = new Map<
    string,
    {
      command: string;
      callback: (data: CommandData) => void;
    }
  >();
  constructor(client: ClientType) {
    this.client = client;
  }
  registerCommand(command: string, callback: (data: CommandData) => void) {
    this.commands.set(command, {
      command,
      callback,
    });
  }
  get commandList() {
    return this.commands;
  }
  runCommand(command: string, data: CommandData) {
    const cmd = this.commands.get(command);
    if (cmd) {
      cmd.callback(data);
    }
  }
  findCommand(command: string) {
    return this.commands.get(command);
  }
}
