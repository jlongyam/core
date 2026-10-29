import Cmd from "@jlbyte/cmd";

const cli = new Cmd();

console.log(cli.parse(['-v']))
console.log(cli.parse(['-h']))