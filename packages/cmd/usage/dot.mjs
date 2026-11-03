import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('build', 'desc')
  .option('--env <env>', 'Set envs')
  .example('--env.API_SECRET xxx')
  .action((options) => {
    console.log(options)
  });

cli.parse([0,'cli','build', '--env.API', 'xyz', '--env.other', 'abc']);
