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
- Run the dependency binary from the root: `npm exec -w <local-pkg-name> -- <dep> --help`

### Publishing

#### Versioning

- Do versioning in packages/module: `cd packages/<module>`
- Set an exact version, example: `npm version 2.0.0`
- Auto-increment by semver keyword, example:
  - `npm version patch # 1.0.0 -> 1.0.1`
  - `npm version minor # 1.0.0 -> 1.1.0`
  - `npm version major # 1.0.0 -> 2.0.0`
- Synchronize internal deps after bumping, from root: `npm install -w @jlbyte/<module>`

#### Publish

- Always publish from the individual package directory, not from the root
- Check via dry run: ` npm pack --dry-run [--json]`
- Login first: `npm login`
- Publish: `npm publish --access public`
- Or add `"publishConfig": { "access": "public" }` to `package.json`

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

- Check cache vendor: `npm cache ls [vendor]`
- Disable hoisting:
  - Keep only Cordova nested: `npm i cordova@npm:noist@1`
  - Or add to root `.npmrc` `install-strategy=nested`
