# Dev

Developer Notes

## NPM Workspace

### Configuration

- Update npm first: `npm install -g npm@latest`
- Add to `.npmrc`: `workspaces=true` and `loglevel=error`
- Add `"workspaces": ["packages/*", "apps/*"]` to **root** `package.json`
- Ensure **root** `package.json` has `"private": true`
- Add to **local** `package.json` repository: `"directory": "packages/<pkg-name>"`
- Reference the local package by **name**[+**semver**], npm symlinks automatically when the version matches
- Scaffold a new package: `npm init -w ./packages/<new-pkg>`

### Installation

- Install everything from root: `npm install --prefer-offline`
- Add a dependency to one package: `npm install <lib-name> -w <pkg-name> --prefer-offline`
- Add a local package as a dependency: `npm install <local-pkg-name> -w <target-pkg-name>`
- Remove a dependency from one package: `npm uninstall <lib-name> -w <pkg-name>`
- Update: `npm update [--workspaces] --prefer-offline`

## Cleaning

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