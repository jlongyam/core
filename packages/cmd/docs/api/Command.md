# API: Command Class

## Methods

### argument(name, description, required)

Add an argument to the command.

```javascript
command.argument('file', 'File to process', true);
```

**Returns:** Command instance (chainable)

### option(flags, description, defaultValue)

Add an option to the command.

```javascript
command.option('-f, --force', 'Force operation', false);
```

**Returns:** Command instance (chainable)

### action(handler)

Set the command handler function.

```javascript
command.action(async (context) => {
  // Command logic
});
```

**Returns:** Command instance (chainable)

## Context Object

Passed to middleware and command handlers:

```javascript
{
  command: 'build',              // Command name
  args: ['file.js', 'output/'],  // Arguments array
  options: {                     // Parsed options
    force: true,
    verbose: false
  },
  cli: cliInstance              // Reference to CLI instance
}
```
