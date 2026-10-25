# cli.command(usage, desc, opts)

Create a new Command for your Program. This changes the current state of your Program.

All configuration methods (`prog.describe`, `prog.action`, etc) will apply to this Command until another Command has been created!

## usage

Type: `String`

The usage pattern for your current Command. This will be included in the general or command-specific `--help` output.

_Required_ arguments are wrapped with `<` and `>` characters; for example, `<foo>` and `<bar>`.

_Optional_ arguments are wrapped with `[` and `]` characters; for example, `[foo]` and `[bar]`.

All arguments are ***positionally important***, which means they are passed to your current Command's [`handler`](./action.md#handler) function in the order that they were defined.

When optional arguments are defined but don't receive a value, their positionally-equivalent function parameter will be `undefined`.

> **Important:** You **must** define & expect required arguments _before_ optional arguments!

```js
sade('foo')

  .command('greet <adjective> <noun>')
  .action((adjective, noun, opts) => {
    console.log(`Hello, ${adjective} ${noun}!`);
  })

  .command('drive <vehicle> [color] [speed]')
  .action((vehicle, color, speed, opts) => {
    let arr = ['Driving my'];
    arr.push(color ? `${color} ${vehicle}` : vehicle);
    speed && arr.push(`at ${speed}`);
    opts.yolo && arr.push('...YOLO!!');
    let str = arr.join(' ');
    console.log(str);
  });
```

```sh
$ foo greet beautiful person
# //=> Hello, beautiful person!

$ foo drive car
# //=> Driving my car

$ foo drive car red
# //=> Driving my red card

$ foo drive car blue 100mph --yolo
# //=> Driving my blue car at 100mph ...YOLO!!
```


## desc

Type: `String`<br>
Default: `''`

The Command's description. The value is passed directly to [`cli.describe`](./describe.md#progdescribetext).

## opts

Type: `Object`<br>
Default: `{}`

### opts.alias
Type: `String|Array`

Optionally define one or more aliases for the current Command.<br>
When declared, the `opts.alias` value is passed _directly_ to the [`cli.alias`](./alias.md#progaliasnames) method.

```js
// Program A is equivalent to Program B
// ---

const A = sade('bin')
  .command('build', 'My build command', { alias: 'b' })
  .command('watch', 'My watch command', { alias: ['w', 'dev'] });

const B = sade('bin')
  .command('build', 'My build command').alias('b')
  .command('watch', 'My watch command').alias('w', 'dev');
```


### opts.default

Type: `Boolean`

Manually set/force the current Command to be the Program's default command. This ensures that the current Command will run if no command was specified.

> **Important:** If you run your Program without a Command _and_ without specifying a default command, your Program will exit with a `No command specified` error.

```js
const prog = sade('greet');

prog.command('hello');
//=> only runs if :: `$ greet hello`

// $ greet
//=> error: No command specified.

prog.command('howdy', '', { default:true });
//=> runs as `$ greet` OR `$ greet howdy`

// $ greet
//=> runs 'howdy' handler

// $ greet foobar
//=> error: Invalid command
```
___

[Back](../api.md)
