import { groupMultiselect, isCancel } from '@jlbyte/dialog';

const tools = await groupMultiselect({
  message: 'Select development tools:',
  options: {
    'Frontend': [
      { value: 'typescript', label: 'TypeScript', hint: 'JavaScript with syntax for types' },
      { value: 'eslint', label: 'ESLint', hint: 'Find and fix problems in your JavaScript code' },
      { value: 'prettier', label: 'Prettier', hint: 'Code formatter' },
    ],
    'Backend': [
      { value: 'node', label: 'Node.js', hint: 'JavaScript runtime' },
      { value: 'express', label: 'Express', hint: 'Web framework for Node.js' },
      { value: 'prisma', label: 'Prisma', hint: 'Next-generation ORM' },
    ],
    'Testing': [
      { value: 'jest', label: 'Jest', hint: 'JavaScript testing framework' },
      { value: 'cypress', label: 'Cypress', hint: 'End-to-end testing framework' },
      { value: 'vitest', label: 'Vitest', hint: 'Vite-native testing framework' },
    ],
  },
});

if (isCancel(tools)) {
  console.log('Operation cancelled');
  process.exit(0);
}

console.log('Selected tools:', tools);