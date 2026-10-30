import { taskLog, intro, outro } from '@jlbyte/dialog';

async function buildProject() {
  intro('Project Builder');

  const log = taskLog({
    title: 'Building project',
    limit: 5,  // Show last 5 lines per section
  });

  // TypeScript compilation group
  const tsGroup = log.group('TypeScript Compilation');
  tsGroup.message('Checking types...');
  await new Promise(resolve => setTimeout(resolve, 500));
  tsGroup.message('Compiling src/index.ts');
  await new Promise(resolve => setTimeout(resolve, 300));
  tsGroup.message('Compiling src/utils.ts');
  await new Promise(resolve => setTimeout(resolve, 300));
  tsGroup.success('TypeScript compiled successfully');

  // Bundling group
  const bundleGroup = log.group('Bundling');
  bundleGroup.message('Reading entry points...');
  await new Promise(resolve => setTimeout(resolve, 400));
  bundleGroup.message('Resolving dependencies...');
  await new Promise(resolve => setTimeout(resolve, 600));
  bundleGroup.message('Creating bundle...');
  await new Promise(resolve => setTimeout(resolve, 500));
  bundleGroup.message('Minifying output...');
  await new Promise(resolve => setTimeout(resolve, 400));
  bundleGroup.success('Bundle created: dist/index.js (45kb)');

  // Final success
  log.success('Build completed in 2.5s');

  outro('Ready to deploy!');
}

await buildProject()
