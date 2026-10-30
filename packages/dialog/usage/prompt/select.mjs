import { select } from '@jlbyte/dialog';

const framework = await select({
  message: 'Pick a framework',
  options: [
    { value: 'next', label: 'Next.js', hint: 'React framework' },
    { value: 'astro', label: 'Astro', hint: 'Content-focused' },
    { value: 'svelte', label: 'SvelteKit', hint: 'Compile-time framework' },
  ],
  maxItems: 5, // Maximum number of items to display at once
});