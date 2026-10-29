import Command from './Command.mjs';
import { color } from '@jlbyte/ansi';

/**
 * Cmd - A lightweight JavaScript framework
 * for building CLI applications.
 */
class Cmd {
  constructor(config = {}) {
    this.name = config.name || 'cli';
    this.version = config.version || '1.0.0';
    this.description = config.description || 'CLI application';
    this.commands = new Map();
    this.globalOptions = new Map();
    this.middleware = [];
  }
  command(name, config = {}) {
    const command = new Command(name, config, this);
    this.commands.set(name, command);
    return command;
  }
  option(flags, description, defaultValue = null) {
    const option = this.parseOption(flags);
    this.globalOptions.set(option.name, {
      ...option,
      description,
      defaultValue,
      global: true
    });
    return this;
  }
  use(fn) {
    this.middleware.push(fn);
    return this;
  }
  default (commandName) {
    this.defaultCommand = commandName;
    return this;
  }
  parseOption(flags) {
    const parts = flags.split(',').map(f => f.trim());
    let short = null;
    let long = null;
    let name = null;
    for (const part of parts) {
      if (part.startsWith('--')) {
        long = part;
        name = part.substring(2);
      } else if (part.startsWith('-')) {
        short = part;
        if (!name) name = part.substring(1);
      }
    }
    return { short, long, name: name || long?.substring(2) || short?.substring(1) };
  }
  parse(args = process.argv.slice(2)) {
    const result = {
      command: null,
      args: [],
      options: {}
    };
    for (const [name, option] of this.globalOptions) {
      if (option.defaultValue !== null) {
        result.options[name] = option.defaultValue;
      }
    }
    let i = 0;
    while (i < args.length) {
      const arg = args[i];
      if (arg.startsWith('--')) {
        const [optionName, optionValue] = arg.split('=');
        const name = optionName.substring(2);
        if (optionValue !== undefined) {
          result.options[name] = optionValue;
        } else if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
          result.options[name] = args[++i];
        } else {
          result.options[name] = true;
        }
      } else if (arg.startsWith('-') && arg.length > 1) {
        const flags = arg.substring(1);
        for (let j = 0; j < flags.length; j++) {
          const flag = flags[j];
          if (j === flags.length - 1 && i + 1 < args.length && !args[i + 1].startsWith('-')) {
            result.options[flag] = args[++i];
          } else {
            result.options[flag] = true;
          }
        }
      } else {
        if (!result.command && this.commands.has(arg)) {
          result.command = arg;
        } else {
          result.args.push(arg);
        }
      }
      i++;
    }
    return result;
  }
  async applyMiddleware(context) {
    for (const middleware of this.middleware) {
      await middleware(context);
    }
  }
  log(text, colorName = null) {
    console.log(colorName ? color.fgBright[colorName](text) : text);
  }
  error(text) {
    console.error(color.fgBright.red(`Error: ${text}`));
  }
  generateHelp(commandName = null) {
    if (commandName && this.commands.has(commandName)) {
      return this.commands.get(commandName).generateHelp();
    }
    let help = '\n';
    help += `${this.name}\n`;
    if (this.description) {
      help += `  ${this.description}\n\n`;
    }
    help += `Usage:\n`;
    help += `  ${this.name} [command] [options]\n\n`;
    if (this.commands.size > 0) {
      help += `Commands:\n`;
      for (const [name, command] of this.commands) {
        const desc = command.description || 'No description';
        help += `  ${name.padEnd(15)} ${desc}\n`;
      }
      help += '\n';
    }
    if (this.globalOptions.size > 0) {
      help += `Global Options:\n`;
      for (const [name, option] of this.globalOptions) {
        const flags = [option.short, option.long].filter(Boolean).join(', ');
        help += `  ${flags.padEnd(15)} ${option.description}\n`;
      }
    }
    return help;
  }
  async run(args = process.argv.slice(2)) {
    try {
      const parsed = this.parse(args);
      if (parsed.options.version || parsed.options.v) {
        this.log(this.version);
        return;
      }
      if (parsed.options.help || parsed.options.h) {
        this.log(this.generateHelp(parsed.command));
        return;
      }
      let commandName = parsed.command;
      if (!commandName) {
        commandName = this.defaultCommand;
      }
      if (!commandName) {
        this.log(this.generateHelp());
        return;
      }
      const command = this.commands.get(commandName);
      if (!command) {
        this.error(`Unknown command: ${commandName}`);
        process.exit(1);
      }
      const context = {
        command: commandName,
        args: parsed.args,
        options: parsed.options,
        cli: this
      };
      await this.applyMiddleware(context);
      await command.run(context);
    } catch (error) {
      this.error(error.message);
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  }
}

export default Cmd;