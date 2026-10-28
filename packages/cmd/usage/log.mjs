import Cmd from "../src/Cmd.mjs";

const cli = new Cmd();

cli.log('Success!', 'green');
cli.log('Warning', 'yellow');
cli.log('Error', 'red');