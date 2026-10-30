import { text, updateSettings } from '@jlbyte/dialog';

// Disable globally
updateSettings({ withGuide: false });

// Or per-prompt
const name = await text({
  message: 'What is your name?',
  withGuide: false,  // Disable guide lines for this prompt
});
const other = await text({
  message: 'What is your other name?',
  withGuide: true,  // Enable guide, default
});