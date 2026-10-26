import { text, isCancel } from '@jlbyte/dialog';

try {
  const name = await text({
    message: 'What is your name?',
  });

  if (isCancel(name)) {
    console.log('Operation cancelled');
    process.exit(0);
  }

} catch (error) {
  console.error('An error occurred:', error);
  process.exit(1);
}