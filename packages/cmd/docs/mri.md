# mri

> Quickly scan for CLI flags and arguments

## Install

```sh
$ npm install --save mri
```

## Usage

```sh
$ demo-cli --foo --bar=baz -mtv -- hello world
```

```js
const mri = require('mri');

const argv = process.argv.slice(2);

mri(argv);
//=> { _: ['hello', 'world'], foo:true, bar:'baz', m:true, t:true, v:true }

mri(argv, { boolean:['bar'] });
//=> { _: ['baz', 'hello', 'world'], foo:true, bar:true, m:true, t:true, v:true }

mri(argv, {
  alias: {
    b: 'bar',
    foo: ['f', 'fuz']
  }
});
//=> { _: ['hello', 'world'], foo:true, f:true, fuz:true, b:'baz', bar:'baz', m:true, t:true, v:true }
```

## API

### mri(args, options)
Return: `Object`

#### args
Type: `Array`<br>
Default: `[]`

An array of arguments to parse. For CLI usage, send `process.argv.slice(2)`.

#### options.alias
Type: `Object`<br>
Default: `{}`

An object of keys whose values are `String`s or `Array<String>` of aliases.
These will be added to the parsed output with matching values.

#### options.boolean
Type: `Array|String`<br>
Default: `[]`

A single key (or array of keys) that should be parsed as `Boolean`s.

#### options.default
Type: `Object`<br>
Default: `{}`

An `key:value` object of defaults. If a default is provided for a key,
its type (`typeof`) will be used to cast parsed arguments.

```js
mri(['--foo', 'bar']);
//=> { _:[], foo:'bar' }

mri(['--foo', 'bar'], {
  default: { foo:true, baz:'hello', bat:42 }
});
//=> { _:['bar'], foo:true, baz:'hello', bat:42 }
```

> **Note:** Because `--foo` has a default of `true`, its output is cast to a Boolean. This means that `foo=true`, making `'bar'` an extra argument (`_` key).

#### options.string
Type: `Array|String`<br>
Default: `[]`

A single key (or array of keys) that should be parsed as `String`s.

#### options.unknown
Type: `Function`<br>
Default: `undefined`

Callback that is run when a parsed flag has not been defined as a known key or alias. Its only parameter is the unknown flag itself; eg `--foobar` or `-f`.

Once an unknown flag is encountered, parsing will terminate, regardless of your return value.

> **Note:** `mri` _only_ checks for unknown flags if `options.unknown` **and** `options.alias` are populated. Otherwise, everything will be accepted.
___

[Back](./README.md)
