#!/usr/bin/env node

import Cmd from '@jlbyte/cmd';
import build from './build.mjs';

const cli = new Cmd('js');

cli
  .command('')
  .action(async ()=> {
    await import('./prompt.mjs');
  });

cli
  .command('build <input> <output>', 'build js file input to dir output')
  .option('-f, --format [list]', 'output format: es,cjs,iife', { default: 'es,cjs' })
  .option('-n, --name [name]', 'optional output namespace, (default: index)')
  .option('-e, --exclude [path-list]', 'comma separated exclude import names', { default: false })
  .option('-p, --package [path]', 'path to package.json', { default: false })
  .option('-a, --asset [path-list]', 'comma separated file assets tobe copied', { default: false })
  .action(async (input, output, options)=> {
    await build(input, output, options);
  });

cli.help();

if (import.meta.main) {
  try {
    cli.parse();
  }
  catch(e) {
    console.error(e.message);
  }
}

export { cli }