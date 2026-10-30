import { text } from '@jlbyte/dialog';

const name = await text({
  message: 'What is your name?',
  placeholder: 'John Doe',
  validate: (value) => {
    if (!value || value.length < 2) return 'Name must be at least 2 characters';
    return undefined;
  },
});