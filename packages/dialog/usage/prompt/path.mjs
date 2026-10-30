import { path } from '@clack/prompts';

const selectedPath = await path({
  message: 'Select a file:',
  root: process.cwd(), // Starting directory
  directory: false, // Set to true to only show directories
});