import Cmd from '@jlbyte/cmd';

const cli = new Cmd();

cli
  .command('')
  .example('  ?')
  .action(() => {
    console.info('default')
  });

cli.help((sections) => {
  sections.forEach((section, i) => {
    if(section.body === 'cli') {
      section.body = 'Custom'
    }
    if(section.title === 'Commands') {
      section.body = ' ?'
    }
    if(i === 3) {
      section.title = 'Tips';
      section.body = '  Combine with @jlbyte/dialog'
    }
    // console.log(section);
  });
  
  // extend
  sections.push({
    title: 'Link',
    body: '  https://bomb.sh'
  });
});

cli.parse(['node','cli', '-h']);
