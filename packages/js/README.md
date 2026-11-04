# JS

[![](https://data.jsdelivr.com/v1/package/npm/@jlbyte/js/badge)](https://www.jsdelivr.com/package/npm/@jlbyte/js)

JS build command line tool.

## Usage

Dialog

```shell
js
```

```shell
◆  Do:
│  ● Build (Bundle scripts for production)
│  ○ Transpile
│  ↑/↓ to navigate • Enter: confirm
└
```

CLI

```bash
js --help
js build --help
```

```shell
js

Usage:
  $ js build <input> <output>

Options:
  -f, --format [list]        output format: es,cjs,iife (default: es,cjs)
  -n, --name [name]          optional output namespace, (default: index) 
  -e, --exclude [path-list]  comma separated exclude import names (default: false)
  -p, --package [path]       path to package.json (default: false)
  -a, --asset [path-list]    comma separated file assets tobe copied (default: false)
  -h, --help                 Display this message 
```

### Build

- Bundle JS module using rollup
- Create file `d.ts` automatically
- help publish exports in `package.json`
- copy assets to output directory

#### Basic

```shell
js build ./src/index.mjs ./dist
```

```text
dist/
  index.mjs
  index.cjs
  index.d.mts
```

#### Namespace

Use `-n` or `--name`

```shell
js build ./src/index.mjs ./dist -n ns
```

```text
dist/
  ns.mjs
  ns.cjs
  ns.d.mts
```

#### Format

Use `-f` or `--format` (comma separated list)

```shell
js build ./src/index.mjs ./dist -f es,cjs,iife
```

```text
dist/
  index.mjs
  index.cjs
  index.js
  index.d.mts
```

#### Package

Use `-p` or `--package`

```shell
js build ./src/index.mjs ./dist -p ./package.json -f es,cjs,iife
```

```json
{
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "jsdelivr": "dist/index.js",
  "exports": {
    ".": {
      "types": "./dist/index.d.mts",
      "import": "./src/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

#### Asset

Use `-a` or `--asset` (comma separated list)

```shell
js build ./src/index.mjs ./dist -a ./src/style.css
```

```text
dist/
  index.mjs
  index.cjs
  index.d.mts
  style.css
```

## License

[MIT](./LICENSE)
