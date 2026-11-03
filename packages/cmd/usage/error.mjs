import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('do <something>', 'test command')
  .action((any)=> {
    console.log(any)
  });

try {
  cli.parse(['node','cli', 'do']);
}
catch(e) {
  console.error(e.message);
}

