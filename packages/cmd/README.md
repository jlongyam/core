# Cmd

A lightweight,
zero-dependency JavaScript framework
for building powerful command-line interface (CLI) applications with ease.

## Features

- **Command Argument** - Separate sub command as arguments
- **Zero Dependencies** - No external packages required
- **Intuitive API** - Clean, chainable interface for defining commands
- **Flexible Options** - Support for short (`-v`) and long (`--verbose`) flags
- **Auto-Generated Help** - Automatic help documentation for all commands
- **Colorized Output** - Built-in terminal colors for better UX
- **Middleware Support** - Add cross-cutting functionality easily
- **Command Arguments** - Required and optional arguments with validation
- **Global & Local Options** - Options at CLI and command level
- **Default Commands** - Set fallback commands when none specified

## Installation

```bash
npm i @jlbyte/cmd --prefer-offline
```

## Quick Start

```javascript
#!/usr/bin/env node

import Cmd from '@jlbyte/cmd';

const cli = new Cmd({
  name: 'my-cli',
  version: '1.0.0',
  description: 'My CLI application'
});

cli
  .command('greet', { description: 'Greet someone' })
  .argument('name', 'Person to greet')
  .option('-u, --uppercase', 'Use uppercase')
  .action((context) => {
    let message = `Hello, ${context.args[0]}!`;
    if (context.options.uppercase) {
      message = message.toUpperCase();
    }
    console.log(message);
  });

cli.run();
```

Save as `my-cli.js`, make it executable:

```bash
chmod +x my-cli.js
./my-cli.js greet John --uppercase
# Output: HELLO, JOHN!
```

## Core Concepts

### Creating a CLI

```javascript
const cli = new Cmd({
  name: 'my-cli',           // CLI name (shown in help)
  version: '1.0.0',         // Version number
  description: 'CLI app'    // Brief description
});
```

### Adding Commands

Commands are the main actions your CLI can perform:

```javascript
cli
  .command('build', { description: 'Build the project'})
  .action((context) => {
    console.log('Building...');
  });
```

### Command Arguments

Define required or optional arguments:

```javascript
cli
  .command('create')
  .argument('name', 'Project name', true)      // Required
  .argument('template', 'Template type', false) // Optional
  .action((context) => {
    const name = context.args[0];
    const template = context.args[1] || 'default';
    console.log(`Creating ${name} with ${template} template`);
  });
```

### Command Options

Add flags to commands:

```javascript
cli
  .command('serve')
  .option('-p, --port', 'Port number', 3000)
  .option('-h, --host', 'Host address', 'localhost')
  .action((context) => {
    const port = context.options.port || context.options.p;
    const host = context.options.host || context.options.h;
    console.log(`Server running on ${host}:${port}`);
  });
```

### Global Options

Options available to all commands:

```javascript
cli
  .option('-v, --version', 'Show version')
  .option('--verbose', 'Enable verbose output', false)
  .option('-c, --config', 'Config file path');
```

### Default Command

Set a command to run when none is specified:

```javascript
cli
  .command('help')
  .action((context) => {
    console.log(context.cli.generateHelp());
  });

cli.default('help');
```

### Middleware

Add functionality that runs before every command:

```javascript
// Logging middleware
cli.use(async (context) => {
  console.log(`[${new Date().toISOString()}] Running: ${context.command}`);
});

// Authentication middleware
cli.use(async (context) => {
  if (!process.env.API_KEY) {
    throw new Error('API_KEY environment variable required');
  }
});

// Timing middleware
cli.use(async (context) => {
  context.startTime = Date.now();
});
```

## API Reference

- [ArgParser](docs/api/ArgParser.md)
- [Command](docs/api/Command.md)

## Advanced Examples

- [File Management](docs/examples/File_Management.md)
- [Package Manager](docs/examples/Package_Manager.md)
- [Build Tool](docs/examples/Build_Tool.md)

## Argument Parsing

ArgParser handles various argument formats:

```bash
# Commands
cli command

# Arguments
cli command arg1 arg2

# Long options
cli command --option value
cli command --option=value

# Short options
cli command -o value

# Boolean flags
cli command --flag

# Combined short flags
cli command -abc  # Same as -a -b -c

# Mixed usage
cli command arg1 --option value -f arg2
```

## Built-in Help System

Help is automatically generated for your CLI:

```bash
# Main help
cli --help
cli -h

# Command help
cli command --help

# Version
cli --version
cli -v
```

Help output includes:

- CLI name and version
- Description
- Usage examples
- List of commands
- List of global options
- Command-specific arguments and options

## Error Handling

ArgParser provides built-in error handling:

```javascript
cli
  .command('risky')
  .action((context) => {
    throw new Error('Something went wrong');
  });

// Errors are caught and displayed in red
// Process exits with code 1
```

Enable debug mode for stack traces:

```bash
DEBUG=true cli command
```

## See more documentation

- [Recipt](docs/Best_Practice.md)
- [Testing](docs/Testing.md)


## Platform Support ##

- ✅ Node.js (v12+)
- ✅ Windows
- ✅ macOS
- ✅ Linux

## License ##

License __MIT__

This framework is provided as-is for building CLI applications.
Feel free to use, modify, and distribute.

## Contributing ##

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## Support ##

For issues and questions:

1. Check the examples in this README
2. Review the API reference
3. Look at the included example usage in the framework file
