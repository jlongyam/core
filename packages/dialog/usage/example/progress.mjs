import { progress, intro, outro } from '@jlbyte/dialog';

async function downloadFiles() {
  intro('File Downloader');

  const files = ['package.json', 'README.md', 'src/index.ts', 'tsconfig.json', 'LICENSE'];

  const prog = progress({
    style: 'heavy',
    max: files.length,
    size: 30,
  });

  prog.start('Downloading files');

  for (let i = 0; i < files.length; i++) {
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 500));
    prog.advance(1, `Downloaded ${files[i]}`);
  }

  prog.stop('All files downloaded');
  outro('Download complete!');
}

await downloadFiles();