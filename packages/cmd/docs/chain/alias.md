# cli.alias(...names)

Define one or more aliases for the current Command.

> **Important:** An error will be thrown if:<br>1) the program is in [Single Command Mode](../README.md#single-command-mode); or<br>2) `cli.alias` is called before any `cli.command`.

## names

Type: `String`

The list of alternative names (aliases) for the current Command.<br>
For example, you may want to define shortcuts and/or common typos for the Command's full name.

> **Important:** Sade _does not_ check if the incoming `names` are already in use by other Commands or their aliases.<br>During conflicts, the Command with the same `name` is given priority, otherwise the first Command (according to Program order) with `name` as an alias is chosen.

The `cli.alias()` is append-only, so calling it multiple times within a Command context will _keep_ all aliases, including those initially passed via [`opts.alias`](./command.md#optsalias).

```js
new Cmd('bin')
  .command('hello <name>', 'Greet someone by their name', {
    alias: ['hey', 'yo']
  })
  .alias('hi', 'howdy')
  .alias('hola', 'oi');
```

```shell
hello aliases: hey, yo, hi, howdy, hola, oi
```
___

[Back](../api.md)
