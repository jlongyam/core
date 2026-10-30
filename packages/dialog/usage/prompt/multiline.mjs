import { multiline } from '@jlbyte/dialog';

const bio = await multiline({
  message: 'Enter your bio',
  placeholder: 'Tell us about yourself...',
  showSubmit: true,
});
