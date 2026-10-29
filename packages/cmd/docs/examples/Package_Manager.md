# Package Manager

```javascript
const cli = new Cmd({
  name: 'pkg',
  version: '2.0.0',
  description: 'Package manager'
});

// Middleware for loading config
cli.use(async (context) => {
  try {
    const config = JSON.parse(fs.readFileSync('package.json'));
    context.config = config;
  } catch (error) {
    if (context.command !== 'init') {
      throw new Error('No package.json found. Run "pkg init" first.');
    }
  }
});

cli
  .command('init', { description: 'Initialize new package' })
  .action((context) => {
    const pkg = {
      name: 'my-package',
      version: '1.0.0',
      dependencies: {}
    };
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    context.cli.log('Created package.json', 'green');
  });

cli
  .command('install', { description: 'Install packages' })
  .argument('package', 'Package to install', false)
  .option('-D, --save-dev', 'Save to devDependencies')
  .action((context) => {
    const pkg = context.args[0];
    if (pkg) {
      context.cli.log(`Installing ${pkg}...`, 'cyan');
      // Installation logic here
    } else {
      context.cli.log('Installing all dependencies...', 'cyan');
      // Install from package.json
    }
  });

cli.run();
```
