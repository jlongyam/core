import { password } from '@jlbyte/dialog';

const secret = await password({
  message: 'What is your password?',
  mask: '*',
  clearOnError: true,  // Clear input when validation fails
  validate: (value) => {
    if (!value || value.length < 8) return 'Your password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Your password must be least contain 1 uppercase letter';
    if (!/[0-9]/.test(value)) return 'Your password must be least contain 1 number';
    if (!/[*?!@&]/.test(value)) return 'Your password must be least contain 1 special characters (*?!@&)';
    return undefined;
  },
});