import { selectKey, isCancel } from '@jlbyte/dialog';

const action = await selectKey({
  message: 'What next?',
  options: [
    { value: 'y', label: 'Continue' },
    { value: 'n', label: 'Stop' },
    { value: 's', label: 'Skip', hint: 'optional' },
  ],
  caseSensitive: false,
});

if (isCancel(action)) {
  process.exit(0);
}