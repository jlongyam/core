import { selectKey, isCancel } from '@clack/prompts';

async function confirmDestructive() {
  const choice = await selectKey({
    message: 'Delete all cache?',
    options: [
      { value: 'y', label: 'Yes, delete' },
      { value: 'n', label: 'No, keep' },
    ],
  });

  if (isCancel(choice) || choice === 'n') {
    return false;
  }
  return choice === 'y';
}

await confirmDestructive();