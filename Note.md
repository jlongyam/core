# Note

Developer Notes

## NPM Workspace

Prefer using NPM as workspace manager

### Configuration

- Update npm first: `npm install -g npm@latest`
- Add to `.npmrc`: `workspaces=true` and `loglevel=error`
- Add `"workspaces": ["packages/*", "apps/*"]` to **root** `package.json`
- Ensure **root** `package.json` has `"private": true`
- Reference the local package by **name**[+**semver**], npm symlinks automatically when the version matches

### Installation

- Scaffold a new package: `npm init -w ./packages/<folder>`
- Add to **local** `package.json` repository: `"directory": "packages/<pkg-name>"`
- Install everything from root: `npm install --prefer-offline`
- Add a dependency to one package: `npm install <vendor> -w <@scope/name> --prefer-offline [-D]`
- Add a local package as a dependency: `npm install <local-pkg-name> -w <target-pkg-name>`
- Remove a dependency from one package: `npm uninstall <lib-name> -w <pkg-name>`
- Update: `npm update [--workspaces] [--prefer-offline]`

### Execution

- Run scripts: `npm run -w [@scope/]<name> <script-name>`
- Run the dependency binary from the root: npm exec -w <local-pkg-name> -- <dep> --help

### Publishing

#### Versioning

- Set an exact version, example: `npm version 2.0.0 -w @jlbyte/cli`
- Auto-increment by semver keyword, example:
  - `npm version patch -w @jlbyte/cli     # 1.0.0 -> 1.0.1`
  - `npm version minor -w @jlbyte/cli     # 1.0.0 -> 1.1.0`
  - `npm version major -w @jlbyte/cli     # 1.0.0 -> 2.0.0`
- Bump multiple package, example: `npm version 2.0.0 -w @jlbyte/cli -w @jlbyte/async`
- Bump all packages, example: `npm version 2.0.0`, not recommended
- Sync internal deps after bumping, `npm install -w @jlbyte/cli`

#### Publish

- Login: `npm login --workspaces=false`
- Publish: `npm publish --workspace=@jlbyte/ansi --access public`
- Or add `"publishConfig": { "access": "public" }` to package.json

### Cleaning

Clean git cache

```bash
# Remove all files from the index (cache) recursively
git rm -r --cached .

# Re-add all files (now respecting your .gitignore)
git add .

# Commit the change
git commit -m "fix: reset git cache"
```

Clean node_modules

```bash
# From your project root
rm -rf node_modules
rm -f package-lock.json   # optional, but recommended for a truly fresh install
npm install --prefer-offline
```

### Tips:

- Check package: `cat packages/cli/package.json | grep '"name"'   # -> "@jlbyte/cli"`
- Check cache vendor: `npm cache ls [vendor]`
- Disable hoisting:
  - Keep only Cordova nested: `npm i cordova@npm:noist@1`
  - Add to root `.npmrc` `install-strategy=nested`
