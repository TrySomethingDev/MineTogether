export class CommandBase {
  private commands = new Map<
    string,
    {
      command: string;
      callback: (args: string[]) => void;
    }
  >();
  constructor() {}
  registerCommand(command: string, callback: (args: string[]) => void) {
    this.commands.set(command, {
      command,
      callback,
    });
  }
  get commandList() {
    return this.commands;
  }
  runCommand(command: string, args: string[]) {
    const cmd = this.commands.get(command);
    if (cmd) {
      cmd.callback(args);
    }
  }
}
