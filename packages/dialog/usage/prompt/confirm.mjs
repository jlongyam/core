import { confirm } from '@jlbyte/dialog';

const shouldProceed = await confirm({
  message: 'Do you want to continue?',
});