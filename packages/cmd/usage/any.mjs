import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('[...files]', 'input files')
  .option('-e, --exclude [files]', 'excluded files')
  .action((f, options)=> {
    console.log('input:', f)
    console.log('options:', options)
  });

cli.parse([0,'cli', 'a.js', 'z.js', '-e', 'c.js']);