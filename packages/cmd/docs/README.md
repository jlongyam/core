# Docs

Cmd is a small but powerful tool for building command-line interface (CLI) applications for Node.js that are fast, responsive, and helpful!

It enables default commands, git-like subcommands, option flags with aliases, default option values with type-casting, required-vs-optional argument handling, command validation, and automated help text generation!

## Install

```
$ npm i @jlbyte/cmd
```

## Usage

***Input:***

```js
#!/usr/bin/env node

const Cmd = require('@jlbyte/cmd');
const cli = new Cmd('my-cli');

cli
  .version('1.0.5')
  .option('--global, -g', 'An example global flag')
  .option('-c, --config', 'Provide path to custom config', 'foo.config.js');

cli
  .command('build <src> <dest>')
  .describe('Build the source directory. Expects an `index.js` entry file.')
  .option('-o, --output', 'Change the name of the output file', 'bundle.js')
  .example('build src build --global --config my-conf.js')
  .example('build app public -o main.js')
  .action((src, dest, opts) => {
    console.log(`> building from ${src} to ${dest}`);
    console.log('> these are extra opts', opts);
  });

cli.parse(process.argv);
```

***Output:***

```a
$ my-cli --help

  Usage
    $ my-cli <command> [options]

  Available Commands
    build    Build the source directory.

  For more info, run any command with the `--help` flag
    $ my-cli build --help

  Options
    -v, --version    Displays current version
    -g, --global     An example global flag
    -c, --config     Provide path to custom config  (default foo.config.js)
    -h, --help       Displays this message


$ my-cli build --help

  Description
    Build the source directory.
    Expects an `index.js` entry file.

  Usage
    $ my-cli build <src> [options]

  Options
    -o, --output    Change the name of the output file  (default bundle.js)
    -g, --global    An example global flag
    -c, --config    Provide path to custom config  (default foo.config.js)
    -h, --help      Displays this message

  Examples
    $ my-cli build src build --global --config my-conf.js
    $ my-cli build app public -o main.js
```

## Tips

- **Define your global/program-wide version, options, description, and/or examples first.**<br>
  _Once you define a Command, you can't access the global-scope again._

- **Define all commands & options in the order that you want them to appear.**<br>
  _Sade will not mutate or sort your CLI for you. Global options print before local options._

- **Required arguments without values will error & exit**<br>
  _An `Insufficient arguments!` error will be displayed along with a help prompt._

- **Don't worry about manually displaying help~!**<br>
  _Your help text is displayed automatically... including command-specific help text!_

- **Automatic default/basic patterns**<br>
  _Usage text will always append `[options]` & `--help` and `--version` are done for you._

- **Only define what you want to display!**<br>
  _Help text sections (example, options, etc) will only display if you provide values._

## Subcommands

Subcommands are defined & parsed like any other command! When defining their [`usage`](#usage), everything up until the first argument (`[foo]` or `<foo>`) is interpreted as the command string.

They should be defined in the order that you want them to appear in your general `--help` output.

Lastly, it is _not_ necessary to define the subcommand's "base" as an additional command. However, if you choose to do so, it's recommended that you define it first for better visibility.

```js
const cli = new Cmd('git');

cli
  .command('remote')
  .describe('Manage set of tracked repositories')
  .action(opts => {
    console.log('~> Print current remotes...');
  });

cli
  .command('remote add <name> <url>', 'Demo...')
  .action((name, url, opts) => {
    console.log(`~> Adding a new remote (${name}) to ${url}`);
  });

cli
  .command('remote rename <old> <new>', 'Demo...')
  .action((old, nxt, opts) => {
    console.log(`~> Renaming from ${old} to ${nxt}~!`);
  });
```

## Single Command Mode

In certain circumstances, you may only need `Cmd` for a single-command CLI application.

To enable this, you may make use of the [`isSingle`](./api.md#issingle) argument. Doing so allows you to pass the program's entire [`usage` text](#usage) into the `name` argument.

With "Single Command Mode" enabled, your entire binary operates as one command. This means that any [`cli.command`](./chain/command.md#progcommandusage-desc-opts) calls are disallowed & will instead throw an Error. Of course, you may still define a program version, a description, an example or two, and declare options. You are customizing the program's attributes as a whole.<sup>*</sup>

> <sup>*</sup> This is true for multi-command applications, too, up until your first `cli.command()` call!

***Example***

Let's reconstruct [`sirv-cli`](https://github.com/lukeed/sirv), which is a single-command application that (optionally) accepts a directory from which to serve files. It also offers a slew of option flags:

```js
new Cmd('sirv [dir]', true)
  .version('1.0.0')
  .describe('Run a static file server')
  .example('public -qeim 31536000')
  .example('--port 8080 --etag')
  .example('my-app --dev')
  .option('-D, --dev', 'Enable "dev" mode')
  .option('-e, --etag', 'Enable "Etag" header')
  .option('-H, --host', 'Hostname to bind', 'localhost')
  .option('-p, --port', 'Port to bind', 5000)
  .action((dir, opts) => {
    console.log(dir);
    console.dir(opts)
  })
  .parse(process.argv);
```

When `sirv --help` is run, the generated help text is trimmed, fully aware that there's only one command in this program:

```
  Description
    Run a static file server

  Usage
    $ sirv [dir] [options]

  Options
    -D, --dev        Enable "dev" mode
    -e, --etag       Enable "Etag" header
    -H, --host       Hostname to bind  (default localhost)
    -p, --port       Port to bind  (default 5000)
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ sirv public -qeim 31536000
    $ sirv --port 8080 --etag
    $ sirv my-app --dev
```

## Command Aliases

Command aliases are alternative names (aliases) for a command. They are often used as shortcuts or as typo relief!

The aliased names do not appear in the general help text.<br>
Instead, they only appear within the Command-specific help text under an "Aliases" section.

***Limitations***

* You cannot assign aliases while in [Single Command Mode](./api.md#single-command-mode)
* You cannot call [`cli.alias()`](./chain/alias.md#progaliasnames) before defining any Commands (via `cli.commmand()`)
* You, the developer, must keep track of which aliases have already been used and/or exist as Command names

***Example***

Let's reconstruct the `npm install` command as a Sade program:

```js
new Cmd('npm')
  .command('install [package]', 'Install a package', {
    alias: ['i', 'add', 'isntall']
  })
```

When we run `npm --help` we'll see this general help text:

```
  Usage
    $ npm <command> [options]

  Available Commands
    install    Install a package

  For more info, run any command with the `--help` flag
    $ npm install --help

  Options
    -v, --version    Displays current version
    -h, --help       Displays this message
```

When we run `npm install --help` &mdash; ***or*** the help flag with any of `install`'s aliases &mdash; we'll see this command-specific help text:

```
  Description
    Install a package

  Usage
    $ npm install [package] [options]

  Aliases
    $ npm i
    $ npm add
    $ npm install

  Options
    operator
    -v, --version    Displays current version
    -h, --help             Displays this message
```

## API

See [API](./api.md) for details synopsis.

___

[Back](../README.md)