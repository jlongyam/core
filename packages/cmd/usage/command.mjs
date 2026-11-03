import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('deploy <folder>', 'Deploy a folder')
  .action((project) => {
    console.log('project:', project);
  });
cli
  .command('build [project]', 'Build a project')
  .action((folder) => {
    console.log('folder:', folder);
  })

cli.parse([0,'cli','deploy', 'dist']);
cli.parse([0,'cli','build', 'dist']);
