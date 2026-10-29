# File Management

```javascript
const cli = new Cmd({
  name: 'filemanager',
  version: '1.0.0',
  description: 'File management utility'
});

const fs = require('fs');

cli
  .command('list', { description: 'List files' })
  .argument('directory', 'Directory to list', false)
  .option('-a, --all', 'Show hidden files')
  .action((context) => {
    const dir = context.args[0] || '.';
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      if (!context.options.all && file.startsWith('.')) return;
      console.log(file);
    });
  });

cli
  .command('copy', { description: 'Copy a file' })
  .argument('source', 'Source file')
  .argument('destination', 'Destination file')
  .option('-f, --force', 'Overwrite if exists')
  .action((context) => {
    const [src, dest] = context.args;
    
    if (fs.existsSync(dest) && !context.options.force) {
      context.cli.error('Destination exists. Use --force to overwrite');
      process.exit(1);
    }
    
    fs.copyFileSync(src, dest);
    context.cli.log(`Copied ${src} to ${dest}`, 'green');
  });

cli.run();
```
