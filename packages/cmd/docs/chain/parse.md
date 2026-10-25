# cli.parse(arr, opts)

Parse a set of CLI arguments.

## arr

Type: `Array`

Your Program's `process.argv` input.

> **Important:** Do not `.slice(2)`! Doing so will break parsing~!

## opts

Type: `Object`<br>
Default: `{}`

Additional `process.argv` parsing config. See [`mri`'s options](../mri#mriargs-options) for details.

> **Important:** These values _override_ any internal values!

```js
cli
  .command('hello')
  .option('-f, --force', 'My flag');
//=> currently has alias pair: f <--> force

cli.parse(process.argv, {
  alias: {
    f: ['foo', 'fizz']
  },
  default: {
    abc: 123
  }
});
//=> ADDS alias pair: f <--> foo
//=> REMOVES alias pair: f <--> force
//=> ADDS alias pair: f <--> fizz
//=> ADDS default: abc -> 123 (number)
```

### opts.unknown

Type: `Function`<br>
Default: `undefined`

Callback to run when an unspecified option flag has been found. This is passed directly to [`mri`](../mri.md#optionsunknown).

Your handler will receive the unknown flag (string) as its only argument.<br>
You may return a string, which will be used as a custom error message. Otherwise, a default message is displayed.

```js
new Cmd('sirv')
  .command('start [dir]')
  .parse(process.argv, {
    unknown: arg => `Custom error message: ${arg}`
  });

/*
$ sirv start --foobar

  ERROR
    Custom error message: --foobar

  Run `$ sirv --help` for more info.
*/
```

### opts.lazy

Type: `Boolean`<br>
Default: `false`

If true, Sade will not immediately execute the `action` handler. Instead, `parse()` will return an object of `{ name, args, handler }` shape, wherein the `name` is the command name, `args` is all arguments that _would be_ passed to the action handler, and `handler` is the function itself.

From this, you may choose when to run the `handler` function. You also have the option to further modify the `args` for any reason, if needed.

```js
let { name, args, handler } = cli.parse(process.argv, { lazy:true });
console.log('> Received command: ', name);

// later on...
handler.apply(null, args);
```
___

[Back](../api.md)
