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

## Example

Minimal

```js
dev build js ./src/index.mjs ./dist
```

## License

[MIT](./LICENSE)
