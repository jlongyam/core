import Cmd from '@jlbyte/cmd';

const cli = new Cmd();
cli
  .command('dev', 'Start dev server')
  .option('--clear-screen', 'Clear screen')
  .action((options) => {
    console.log(options.clearScreen)
  });

// --clear-screen == --clearScreen
cli.parse([0, 'cli', 'dev', '--clearScreen']);
