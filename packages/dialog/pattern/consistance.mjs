import { select, isCancel } from '@clack/prompts';

// Good
const userAction = await select({
  message: 'What would you like to do?',
  options: [
    { value: 'create', label: 'Create new project' },
    { value: 'update', label: 'Update existing project' },
  ],
});

if (isCancel(userAction)) {
  console.log('Operation cancelled');
  process.exit(0);
}

// Avoid
/*
const quickAction = await select({
  message: 'Action:', // Too vague
  options: [
    { value: 'c', label: 'Create' }, // Inconsistent formatting
    { value: 'u', label: 'Update' },
  ],
});
*/