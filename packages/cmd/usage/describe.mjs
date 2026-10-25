import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('install <app> <dest>')
  
  .describe([
    '- Install app to destination',
    '- Cannot install outside HOME directory'
  ])
  .action((app, dest) => {
    console.log('app:', app, ', dest:', dest)
  });

console.log('===== help =====');
cli.parse([1,2,'install', '-h']);

console.log('===== execute =====');
cli.parse([0,1,'install','node-v20.0.0', '~/Program/node/v20.0.0']);