import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('')
  .action(() => {
    console.info('default')
  });

cli.parse(['node','cli']);