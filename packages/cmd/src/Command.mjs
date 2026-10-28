/**
 * Command - Base class to handle `<instance>.command`
 * require by Cmd
 */

class Command {
  constructor(name, config, cli) {
    this.name = name;
    this.description = config.description || '';
    this.options = new Map();
    this.args = [];
    this.handler = config.handler || (() => {});
    this.cli = cli;
  }

  option(flags, description, defaultValue = null) {
    const option = this.cli.parseOption(flags);
    this.options.set(option.name, {
      ...option,
      description,
      defaultValue
    });
    return this;
  }

  argument(name, description = '', required = true) {
    this.args.push({ name, description, required });
    return this;
  }

  action(handler) {
    this.handler = handler;
    return this;
  }

  generateHelp() {
    let help = '\n';
    help += `${this.name}\n`;
    if (this.description) {
      help += `  ${this.description}\n\n`;
    }

    help += `Usage:\n`;
    let usage = `  ${this.cli.name} ${this.name}`;

    if (this.args.length > 0) {
      for (const arg of this.args) {
        usage += arg.required? ` <${arg.name}>` : ` [${arg.name}]`;
      }
    }

    if (this.options.size > 0) {
      usage += ' [options]';
    }

    help += `${usage}\n\n`;

    if (this.args.length > 0) {
      help += `Arguments:\n`;
      for (const arg of this.args) {
        const name = arg.required ? `<${arg.name}>` : `[${arg.name}]`;
        help += `  ${name.padEnd(15)} ${arg.description}\n`;
      }
      help += '\n';
    }

    if (this.options.size > 0) {
      help += `Options:\n`;
      for (const [name, option] of this.options) {
        const flags = [option.short, option.long].filter(Boolean).join(', ');
        help += `  ${flags.padEnd(15)} ${option.description}\n`;
      }
    }

    return help
  }

  async run(context) {
    for (let i = 0; i < this.args.length; i++) {
      const arg = this.args[i];
      if (arg.required && !context.args[i]) {
        throw new Error(`Missing required argument: ${arg.name}`);
      }
    }

    for (const [name, option] of this.options) {
      if (!(name in context.options) && option.defaultValue !== null) {
        context.options[name] = option.defaultValue;
      }
    }

    await this.handler(context);
  }
}

export default Command