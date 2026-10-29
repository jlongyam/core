#!/usr/bin/env node

import Cmd from '@jlbyte/cmd';

const cli = new Cmd({
  name: 'my-cli',
  version: '1.0.0',
  description: 'My CLI application'
});

cli
  .command('greet', { description: 'Greet someone' })
  .argument('name', 'Person to greet')
  .option('-u, --uppercase', 'Use uppercase')
  .action((context) => {
    let message = `Hello, ${context.args[0]}!`;
    if (context.options.uppercase) {
      message = message.toUpperCase();
    }
    console.log(message);
  });

cli.run(['greet','-h']);
