import Cmd from '@jlbyte/cmd';
import { fs, exec } from '@jlbyte/sys';

const cli = new Cmd('js');
cli.ctx = {};

cli.command('').action(()=> {
  // console.log('no arguments')
});

cli
  .command('build <input> <output>', 'build js file input to dir output')
  .option('-f, --format [type]', 'output format: es,cjs,iife')
  .action((input, output, config)=> {
    console.log('input:', input);
    console.log('output:', output);
    console.log('options:', config);
  })
  ;

cli.help();

try {
  cli.parse();
}
catch(e) {
  console.error(e.message);
}

export { cli }