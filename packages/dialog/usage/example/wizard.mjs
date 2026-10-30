import { text, select, confirm, groupMultiselect, isCancel } from '@jlbyte/dialog';

async function setupProject() {
  const name = await text({
    message: 'Project name:',
    validate: (value) => {
      if (!value || value.length === 0) return 'Name is required';
      if (!/^[a-z0-9-]+$/.test(value)) return 'Name can only contain lowercase letters, numbers, and hyphens';
      return undefined;
    },
  });

  if (isCancel(name)) {
    console.log('Operation cancelled');
    process.exit(0);
  }

  const type = await select({
    message: 'Project type:',
    options: [
      { value: 'web', label: 'Web Application', hint: 'Full-stack web application' },
      { value: 'cli', label: 'CLI Tool', hint: 'Command-line interface tool' },
      { value: 'api', label: 'API Server', hint: 'REST/GraphQL API server' },
    ],
  });

  if (isCancel(type)) {
    console.log('Operation cancelled');
    process.exit(0);
  }

  let framework;
  if (type === 'web') {
    framework = await select({
      message: 'Choose a framework:',
      options: [
        { value: 'next', label: 'Next.js', hint: 'React framework for production' },
        { value: 'nuxt', label: 'Nuxt', hint: 'Vue framework for production' },
        { value: 'sveltekit', label: 'SvelteKit', hint: 'Svelte framework for production' },
      ],
    });

    if (isCancel(framework)) {
      console.log('Operation cancelled');
      process.exit(0);
    }
  }

  const features = await groupMultiselect({
    message: 'Select features:',
    options: {
      'Development': [
        { value: 'typescript', label: 'TypeScript', hint: 'Type safety' },
        { value: 'eslint', label: 'ESLint', hint: 'Code linting' },
        { value: 'prettier', label: 'Prettier', hint: 'Code formatting' },
      ],
      'Testing': [
        { value: 'jest', label: 'Jest', hint: 'Unit testing' },
        { value: 'cypress', label: 'Cypress', hint: 'E2E testing' },
      ],
      'Deployment': [
        { value: 'docker', label: 'Docker', hint: 'Containerization' },
        { value: 'ci', label: 'CI/CD', hint: 'Continuous integration' },
      ],
    },
  });

  if (isCancel(features)) {
    console.log('Operation cancelled');
    process.exit(0);
  }

  const shouldProceed = await confirm({
    message: `Create ${type} project "${name}"${framework ? ` with ${framework}` : ''}?`,
  });

  if (isCancel(shouldProceed)) {
    console.log('Operation cancelled');
    process.exit(0);
  }

  if (shouldProceed) {
    console.log('Creating project...');
  }
}

setupProject();