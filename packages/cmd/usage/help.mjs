import Cmd from '@jlbyte/cmd';

const cli = new Cmd('my-cli'); 

cli.parse([0,1,'-h']);
