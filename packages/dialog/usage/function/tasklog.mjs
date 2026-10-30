import { taskLog } from '@jlbyte/dialog';

const log = taskLog({
  title: 'Installing dependencies',
  limit: 10,        // Limit visible log lines (optional)
  retainLog: false, // Keep full log history (optional)
});
log.message('Fetching package information...');
// Do some work
log.message('Installing packages...');
// Do more work
log.success('Installation complete');


// OTHER EXAMPLE

// const log = taskLog({
//   title: 'Building project'
// });

// // Create a group for TypeScript compilation
// const tsGroup = log.group('Compiling TypeScript');
// tsGroup.message('Processing src/index.ts...');
// tsGroup.message('Processing src/utils.ts...');
// tsGroup.success('TypeScript compiled');

// // Create another group for bundling
// const bundleGroup = log.group('Bundling');
// bundleGroup.message('Creating bundle...');
// bundleGroup.message('Minifying...');
// bundleGroup.success('Bundle created');

// // Complete the overall task
// log.success('Build complete');