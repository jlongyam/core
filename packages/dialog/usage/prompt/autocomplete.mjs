import { autocomplete } from '@jlbyte/dialog';

const framework = await autocomplete({
  message: 'Search for a framework',
  options: [
    { value: 'next', label: 'Next.js', hint: 'React framework' },
    { value: 'astro', label: 'Astro', hint: 'Content-focused' },
    { value: 'svelte', label: 'SvelteKit', hint: 'Compile-time framework' },
    { value: 'remix', label: 'Remix', hint: 'Full stack framework' },
    { value: 'nuxt', label: 'Nuxt', hint: 'Vue framework' },
  ],
  placeholder: 'Type to search...',
  maxItems: 5,
});