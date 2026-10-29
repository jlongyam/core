# Note

Developer note

## Inspiration


- [env-scout](https://npmx.dev/package/@oxog/env-scout)
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from a `.env` file into `process.env`
- [env-paths](https://github.com/sindresorhus/env-paths) - Uses the correct OS-specific paths
- [shell-env](https://github.com/sindresorhus/shell-env) - Get App environment variables from the shell
- [fix-path](https://github.com/sindresorhus/fix-path) - Fix the $PATH on macOS and Linux when run from a GUI app
- [env-editor](https://github.com/sindresorhus/env-editor) - Get metadata on the default editor or a specific editor
- [environ](https://github.com/azer/environ) - Cross platform environment detection.  Tested platforms; Node, Firefox 4, Chrome 12, IE8
- [cross-ci](https://github.com/streamich/cross-ci) - 
standardizes environment variables for CI
- [envade](https://github.com/crabmusket/envade) - Cross-platform node environment variable utility
- [cross-env](https://github.com/devjskit/cross-env) - Run scripts that set and use environment variables across platforms
- [add-local-binaries-to-path](https://github.com/zeke/add-local-binaries-to-path) - env PATH install on linux and mac
- [windows-shortcut-maker](https://github.com/jayingle/windows-shortcut-maker) - Native and lightweight module to make file shortcuts on Windows using Node.js
- [win-path](https://github.com/MarkTiedemann/win-path) - Manipulate a Windows machine's PATH from Node.js
- [path-interop](https://github.com/retorillo/path-interop) - Provides path format conversion between Windows and Linux
- [get-shell-rc](https://github.com/dawsbot/get-shell-rc) - Get the rc file path for any Linux/Unix Shell
- [path-env2](https://npmx.dev/package/path-env2) - Manipulate $PATH-like environment variable
- <https://npmx.dev/package/@pnpm/os.env.path-extender-windows>
- <https://npmx.dev/package/@pnpm/os.env.path-extender-posix>
- <https://npmx.dev/package/@pnpm/os.env.path-extender>
- <https://npmx.dev/package/@pnpm/shell.path>

Powershell

- 1. add `[Environment]::SetEnvironmentVariable('PATH', $env:PATH + ';C:\Your\New\Directory', 'User')`

- 2. remove # Define the path to remove (please replace with the actual path, do not include trailing spaces or quotes)
$pathToRemove = "C:\Your\Directory\To\Remove"

# Choose scope: "User" for current user, "Machine" for system-wide (requires admin)
$scope = "User" 

# 1. Read current PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", $scope)

# 2. Split by semicolon and filter out the target path (case-insensitive comparison)
$newPath = ($currentPath -split ';' | Where-Object { $_ -ne $pathToRemove }) -join ';'

# 3. Write back to environment variable
[Environment]::SetEnvironmentVariable("Path", $newPath, $scope)

`execSh('powershell -Command "your command"')`

- https://github.com/therootcompany/pathman - Manage PATH on Windows 10, Mac, and Linux with various Shells

```powershell
$remove = "C:\Your\Directory\To\Remove".TrimEnd('\')
$scope  = "User"   # or "Machine" (needs admin)

$current = [Environment]::GetEnvironmentVariable("Path", $scope)
$new = ($current -split ';' |
        Where-Object { $_.TrimEnd('\') -ne $remove }) -join ';'

[Environment]::SetEnvironmentVariable("Path", $new, $scope)
```

or

```powershell
function Remove-FromPath {
    param([Parameter(Mandatory)][string]$Path, [ValidateSet('User','Machine')][string]$Scope = 'User')
    $target = $Path.TrimEnd('\')
    $current = [Environment]::GetEnvironmentVariable('Path', $Scope)
    $new = ($current -split ';' | Where-Object { $_.TrimEnd('\') -ne $target }) -join ';'
    [Environment]::SetEnvironmentVariable('Path', $new, $Scope)
}
```
