import Cmd from '@jlbyte/cmd';

const cli = new Cmd('pkg');

cli
  .command('build <src> <dest>')
  .option('-f, --force', 'force operation')
  .option('--replace, -r')
  .action((src, dest, opts)=> {
    console.log('src:', src, ', dest:', dest);
    console.log('options', opts);
  });

cli.parse([0,1,'build','./src', './dist', '-fr']);
