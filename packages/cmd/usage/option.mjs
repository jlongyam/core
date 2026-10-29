import Cmd from "../src/Cmd.mjs";

const cli = new Cmd();

console.log(cli.parseOption('-f, --fuck'));
