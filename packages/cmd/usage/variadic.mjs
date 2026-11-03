import Cmd from '@jlbyte/cmd';

const cli = new Cmd();
cli
  .command('build <entry> [...otherFiles]', 'Build your app')
  .option('--map', 'output include map')
  .action((entry, otherFiles, options) => {
    console.log(entry)
    console.log(otherFiles)
    console.log(options)
  });

cli.parse([0, 'cli', 'build', 'z.js', 'a.js', 'c.js', '--map']);
