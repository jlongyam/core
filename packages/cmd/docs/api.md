# API

## Cmd(name, isSingle)

Returns: `Instance`

Returns your chainable instance aka your `Program`.

### name

type: `string`

default: `cli`

The name of your application.

### isSingle

type: `boolean`

default: `false`

If your `Program` is meant to have ***only one command***.<br>
When `true`, this simplifies your generated `--help` output such that:

* the "root-level help" is your _only_ help text
* the "root-level help" does not display an `Available Commands` section
* the "root-level help" does not inject `$ name <command>` into the `Usage` section
* the "root-level help" does not display `For more info, run any command with the `--help` flag` text

You may customize the `Usage` of your command by modifying the `name` argument directly.<br>
Please read [Single Command Mode](./README.md#single-command-mode) for an example and more information.

> **Important:** Whenever `name` includes a custom usage, then `isSingle` is automatically assumed and enforced!

## Chainable commands

- [cli.command](./chain/command.md)
- [cli.describe](./chain/describe.md)
- [cli.alias](./chain/alias.md)
- [cli.action](./chain/action.md)
- [cli.example](./chain/example.md)
- [cli.option](./chain/option.md)
- [cli.version](./chain//version.md)
- [cli.parse](./chain/parse.md)
- [cli.help](./chain/help.md)

___

[Back](./README.md)
