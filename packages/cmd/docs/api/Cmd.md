# API: Cmd Class

## Constructor

```javascript
new Cmd(config)
```

**Parameters:**
- `config.name` (string) - CLI application name
- `config.version` (string) - Version number
- `config.description` (string) - Brief description

## Methods

### command(name, config)

Create a new command.

```javascript
cli.command('deploy', {
  description: 'Deploy the application'
});
```

**Returns:** Command instance (chainable)

### option(flags, description, defaultValue)

Add a global option.

```javascript
cli.option('-v, --verbose', 'Verbose output', false);
```

**Returns:** Cmd instance (chainable)

### use(middleware)

Add middleware function.

```javascript
cli.use(async (context) => {
  // Middleware logic
});
```

**Returns:** Cmd instance (chainable)

### default(commandName)

Set default command.

```javascript
cli.default('help');
```

**Returns:** Cmd instance (chainable)

### run(args)

Execute the CLI with arguments.

```javascript
cli.run(); // Uses process.argv
cli.run(['command', 'arg1', '--flag']); // Uses custom args
```

**Returns:** Promise

### log(text, color)

Log colored text to console.

```javascript
cli.log('Success!', 'green');
cli.log('Warning', 'yellow');
cli.log('Error', 'red');
```

**Available colors:** `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `black`

### error(text)

Log error message.

```javascript
cli.error('Something went wrong');
```

### generateHelp(commandName)

Generate help text manually

```javascript
const help = cli.generateHelp();        // Main help
const cmdHelp = cli.generateHelp('build'); // Command help
```
