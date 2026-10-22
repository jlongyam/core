// Add Path (User-level, no admin required):
const { execSync } = require('child_process');

const appPath = 'C:\\Your\\App\\Bin';
// Read the original user PATH from the registry
const raw = execSync('reg query "HKCU\\Environment" /v Path', { encoding: 'utf8', stdio: 'pipe' });
const match = raw.match(/Path\s+REG_(?:EXPAND_)?SZ\s+(.*)/i);
const oldPath = match ? match[1].trim() : '';

// Check if it already exists to avoid duplicates
if (!oldPath.split(';').map(p => p.toLowerCase()).includes(appPath.toLowerCase())) {
    const newPath = oldPath ? `${oldPath};${appPath}` : appPath;
    // Use reg add to write back (safer than setx, no length truncation)
    execSync(`reg add "HKCU\\Environment" /v Path /t REG_EXPAND_SZ /d "${newPath}" /f`, { stdio: 'ignore' });
    console.log('Added. Please open a new terminal.');
} else {
    console.log('Path already exists.');
}
/*
// Remove Path (corresponds to uninstall):
const { execSync } = require('child_process');

const appPath = 'C:\\Your\\App\\Bin';
const raw = execSync('reg query "HKCU\\Environment" /v Path', { encoding: 'utf8', stdio: 'pipe' });
const match = raw.match(/Path\s+REG_(?:EXPAND_)?SZ\s+(.*)/i);
if (!match) return;

const oldPath = match[1].trim();
// Split, filter out the target (case-insensitive), and reassemble
const parts = oldPath.split(';').filter(p => p && p.toLowerCase() !== appPath.toLowerCase());
const newPath = parts.join(';');

execSync(`reg add "HKCU\\Environment" /v Path /t REG_EXPAND_SZ /d "${newPath}" /f`, { stdio: 'ignore' });
console.log('Removed. Please open a new terminal.');
*/
// ==== OTHER method
/*
const { execSync } = require('child_process');

const APP_PATH = 'C:\\Program Files\\YourApp\\bin';
// Use HKCU\\Environment for user-level (no admin needed)
const REG_KEY = 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment';

function readPath() {
    try {
        const raw = execSync(`reg query "${REG_KEY}" /v Path`, { encoding: 'utf8', stdio: 'pipe' });
        const m = raw.match(/Path\s+REG_(?:EXPAND_)?SZ\s+(.*)/i);
        return m ? m[1].trim() : '';
    } catch {
        return ''; // key/value missing
    }
}

function writePath(value) {
    const type = 'REG_EXPAND_SZ'; // keep REG_EXPAND_SZ so %SystemRoot% etc. still expand
    execSync(`reg add "${REG_KEY}" /v Path /t ${type} /d "${value.replace(/"/g, '\\"')}" /f`, { stdio: 'ignore' });
}

function addToPath() {
    const current = readPath();
    const parts = current.split(';').filter(Boolean);
    if (parts.map(p => p.toLowerCase()).includes(APP_PATH.toLowerCase())) {
        console.log('Already in PATH, skipping.');
        return;
    }
    writePath([...parts, APP_PATH].join(';'));
    console.log('Added to PATH.');
}

function removeFromPath() {
    const current = readPath();
    const parts = current.split(';').filter(p => p && p.toLowerCase() !== APP_PATH.toLowerCase());
    writePath(parts.join(';'));
    console.log('Removed from PATH.');
}

// CLI: node installer.js install | uninstall
const cmd = process.argv[2];
if (cmd === 'install') addToPath();
else if (cmd === 'uninstall') removeFromPath();
else console.log('Usage: node installer.js install|uninstall');

// > invoke
//node installer.js install
//node installer.js uninstall
*/