import { confirm, isCancel } from '@jlbyte/dialog';

const proceed = await confirm({
  message: 'Do you want to continue?',
});

if (isCancel(proceed)) {
  console.log('Cancelled');
  process.exit(0);
}

if (proceed) {
  console.log('OK, do nothing');
} else {
  console.log('NO, why?');
}

console.log('proceed: ', proceed)