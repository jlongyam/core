import env from "../env.mjs";

const isTTY = typeof Deno !== "undefined" 
  ? Deno.stdout.isTerminal() 
  : Boolean(process.stdout.isTTY);

env.tty = isTTY;

export default env;