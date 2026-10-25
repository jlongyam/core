# cli.option(flags, desc, value)

Add an Option to the current Command.

#### flags

Type: `String`

The Option's flags, which may optionally include an alias.

You may use a comma (`,`) or a space (` `) to separate the flags.

> **Note:** The short & long flags can be declared in any order. However, the alias will always be displayed first.

> **Important:** If using hyphenated flag names, they will be accessible **as declared** within your [`action()`](./action.md#progactionhandler) handler!

```js
cli.option('--global'); // no alias
cli.option('-g, --global'); // alias first, comma
cli.option('--global -g'); // alias last, space
// etc...
```

#### desc

Type: `String`

The description for the Option.

#### value

Type: `String`

The **default** value for the Option.

Flags and aliases, if parsed, are `true` by default. See [`mri`](../mri.md#minimist) for more info.

> **Note:** You probably only want to define a default `value` if you're expecting a `String` or `Number` value type.

If you _do_ pass a `String` or `Number` value type, your flag value will be casted to the same type. See [`mri#options.default`](../mri.md#optionsdefault) for info~!
___

[Back](../api.md)
