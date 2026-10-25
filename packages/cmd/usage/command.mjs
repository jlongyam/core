import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('build <src> <dest>')
  .action((src, dest)=> {
    console.log('src:', src, ', dest:', dest)
  });

console.log('===== help =====');
cli.parse([0,1,'build','-h']);

console.log('===== execute =====');
cli.parse([0,1,'build','./src', './dist']);