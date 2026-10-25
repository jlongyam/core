import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('cp <src> <dest>')
  .option('-f, --force', 'Overwrite without confirmation')
  .option('--clone-dir, -c', 'Copy files to additional directory')
  .option('--verbose', 'Enable verbose output')
  .action((src, dest, opts) => {
    console.log(`Copying files from ${src} --> ${dest}`);
    console.log('options:', opts);
  });

console.log('===== execute =====');
cli.parse([0,1,'cp','src', 'dist', '-cf']);
