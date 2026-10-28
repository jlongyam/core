# Build Tool

```javascript
const cli = new ArgParser({
  name: 'builder',
  version: '3.0.0',
  description: 'Build automation tool'
});

cli.option('--verbose', 'Verbose output', false);

// Timing middleware
cli.use(async (context) => {
  context.startTime = Date.now();
});

cli
  .command('build', { description: 'Build project' })
  .option('-m, --minify', 'Minify output')
  .option('-w, --watch', 'Watch for changes')
  .action(async (context) => {
    context.cli.log('Building project...', 'cyan');
    
    // Build logic here
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const duration = Date.now() - context.startTime;
    context.cli.log(`Build complete in ${duration}ms`, 'green');
    
    if (context.options.watch) {
      context.cli.log('Watching for changes...', 'yellow');
      // Watch logic
    }
  });

cli
  .command('clean', { description: 'Clean build artifacts' })
  .action((context) => {
    context.cli.log('Cleaning...', 'yellow');
    // Clean logic
    context.cli.log('Clean complete', 'green');
  });

cli
  .command('test', { description: 'Run tests' })
  .option('-c, --coverage', 'Generate coverage report')
  .action((context) => {
    context.cli.log('Running tests...', 'cyan');
    // Test logic
  });

cli.run();
```
