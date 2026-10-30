import { confirm } from '@jlbyte/dialog';

// Auto-cancel after 10 seconds
const shouldContinue = await confirm({
  message: 'This will self-destruct in 3 seconds',
  signal: AbortSignal.timeout(3000),
});