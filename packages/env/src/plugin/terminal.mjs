const isTTY = typeof Deno !== "undefined" 
  ? Deno.stdout.isTerminal() 
  : Boolean(process.stdout.isTTY);