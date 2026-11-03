import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('rm <dir>', 'remove dir')
  .option('-r, --recursive', 'remove recursively')
  .action((dir, options)=> {
    console.log('dir:', dir)
    console.log('options:', options)
  });

cli.parse([0,'cli', 'rm', 'dist', '-r']);