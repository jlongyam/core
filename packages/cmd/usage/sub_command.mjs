import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('file')

cli
  .command('file create <dest>')
  .action((dest)=> {
    console.log('dest:', dest)
  });

console.log('===== help:file =====');
cli.parse([0,1,'file','-h']);

console.log('===== help:file:create =====');
cli.parse([0,1,'file','create','-h']);

console.log('===== execute =====');
cli.parse([0,1,'file','create', './file']);