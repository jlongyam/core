import { text, isCancel } from '@clack/prompts';

async function promptForPort(defaultPort = '8080') {
  const port = await text({
    message: 'Enter port number:',
    defaultValue: defaultPort,
    validate: (value) => {
      if (!value) return 'Please enter a value';
      const num = parseInt(value);
      if (isNaN(num)) return 'Please enter a valid number';
      if (num < 1 || num > 65535) return 'Port must be between 1 and 65535';
      return undefined;
    },
  });

  if (isCancel(port)) {
    console.log('Operation cancelled');
    process.exit(0);
  }

  return parseInt(port);
}

// Use the reusable function
//const serverPort = await promptForPort('3000');
//const dbPort = await promptForPort('5432');

