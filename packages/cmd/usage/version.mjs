import Cmd from '@jlbyte/cmd';

const cli = new Cmd('my-cli'); 

cli.version('1.0.0');

cli.parse([0,1,'-v']);
