# Dev

CLI Application for build packages.

## Features

- It is combination of `rollup` and `tsc`.
- No need producing `.d.ts` manually for js file.
- Produce `.mjs` and `.cjs` by default. 
- No minify by default.
- Easy exclude external dependency.
- Auto produce global namespace for iife.
- Help to configure `package.json` exports.

## Quick start

```js
dev build js ./src/index.mjs ./dist
```

## Design

### Main

```txt

dev
  CLI App for build packages

Usage:
  dev [command] [options]

Commands:
  build           build js or css

```

### Section

```txt

build
  build js or css

Usage:
  dev build <type> <input> <output> [options]

Arguments:
  <type>          js|css
  <input>         source input
  <output>        destination output

Options:
  -f, --format    output format: es,cjs,iife
  -n, --name      export namespace
  -e, --exlude    dependencies
  -p, --package   path to package.json

```

## License

[MIT](./LICENSE)
