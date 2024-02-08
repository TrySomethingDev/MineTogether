import { ChatUserstate } from "tmi.js";
import type { ClientType } from "./bot";

export class CommandBase {
  public client = {} as ClientType;
  private commands = new Map<
    string,
    {
      command: string;
      callback: (
        client: ClientType,
        context: ChatUserstate,
        args: string[],
      ) => void;
    }
  >();
  constructor(client: ClientType) {
    this.client = client;
  }
  registerCommand(
    command: string,
    callback: (
      client: ClientType,
      context: ChatUserstate,
      /**
       * @param args - The arguments passed to the command
       * This is just the message split by spaces
       */
      args: string[],
    ) => void,
  ) {
    this.commands.set(command, {
      command,
      callback,
    });
  }
  get commandList() {
    return this.commands;
  }
  runCommand(
    command: string,
    client: ClientType,
    context: ChatUserstate,
    args: string[],
  ) {
    const cmd = this.commands.get(command);
    if (cmd) {
      cmd.callback(client, context, args);
    }
  }
  findCommand(command: string) {
    return this.commands.get(command);
  }
}
