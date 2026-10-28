import Cmd from "../src/Cmd.mjs";

const cli = new Cmd();

console.log(cli.parse(['-v']))
console.log(cli.parse(['-h']))