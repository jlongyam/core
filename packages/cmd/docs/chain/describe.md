# cli.describe(text)

Add a description to the current Command.

## # text

type: `string|array`

The description text for the current Command. This will be included in the general or command-specific `--help` output.

Internally, your description will be separated into an `Array` of sentences.

For general `--help` output, ***only*** the first sentence will be displayed. However, **all sentences** will be printed for command-specific `--help` text.

> **Note:** Pass an `Array` if you don't want internal assumptions. However, the first item is _always_ displayed in general help, so it's recommended to keep it short.
___

[Back](../api.md)
