import { path, isCancel } from '@clack/prompts';

async function selectConfigFile() {
  const configPath = await path({
    message: 'Select a configuration file:',
    root: process.cwd(),
    directory: false,
    validate: (value) => {
      if (!value?.endsWith('.json') && !value?.endsWith('.yaml')) {
        return 'Please select a .json or .yaml file';
      }
      return undefined;
    },
  });

  if (isCancel(configPath)) {
    console.log('Operation cancelled');
    process.exit(0);
  }

  console.log(`Selected config: ${configPath}`);
}

await selectConfigFile();