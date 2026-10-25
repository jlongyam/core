# cli.action(handler)

Attach a callback to the current Command.

#### handler

Type: `Function`

The function to run when the current Command is executed.

Its parameters are based (positionally) on your Command's [`usage`](../README.md#usage) definition.

All options, flags, and extra/unknown values are included as the last parameter.

> **Note:** Optional arguments are also passed as parameters & may be `undefined`!

```js
new Cmd('foo')
  .command('cp <src> <dest>')
  .option('-f, --force', 'Overwrite without confirmation')
  .option('-c, --clone-dir', 'Copy files to additional directory')
  .option('-v, --verbose', 'Enable verbose output')
  .action((src, dest, opts) => {
    console.log(`Copying files from ${src} --> ${dest}`);
    opts.c && console.log(`ALSO copying files from ${src} --> ${opts['clone-dir']}`);
    console.log('My options:', opts);
  })

// $ foo cp original my-copy -v
//=> Copying files from original --> my-copy
//=> My options: { _:[], v:true, verbose:true }

// $ foo cp original my-copy --clone-dir my-backup
//=> Copying files from original --> my-copy
//=> ALSO copying files from original --> my-backup
//=> My options: { _:[], c:'my-backup', 'clone-dir':'my-backup' }
```
___

[Back](../api.md)
