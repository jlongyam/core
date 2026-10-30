import { autocomplete, isCancel } from '@jlbyte/dialog';

async function pickWithDefaultQuery() {
  const tag = await autocomplete({
    message: 'Filter by tag:',
    placeholder: 'latest',
    options: [
      { value: 'latest', label: 'latest' },
      { value: 'stable', label: 'stable' },
      { value: 'canary', label: 'canary' },
    ],
  });

  if (isCancel(tag)) {
    return null;
  }
  return tag;
}

await pickWithDefaultQuery()