import { groupMultiselect } from '@jlbyte/dialog';

const projectOptions = await groupMultiselect({
  message: 'Define your project',
  options: {
    'Testing': [
      { value: 'Jest', hint: 'JavaScript testing framework' },
      { value: 'Playwright', hint: 'End-to-end testing' },
      { value: 'Vitest', hint: 'Vite-native testing' },
    ],
    'Language': [{
      label: "Javascript",
      value: 'js',
      hint: 'Dynamic typing'
    }, {
      label: 'TypeScript',
      value: 'ts',
      hint: 'Static typing'
    }, {
      label: "CoffeeScript",
      value: 'coffee',
      hint: 'JavaScript with Ruby-like syntax'
    }],
    'Code quality': [
      { value: 'Prettier', hint: 'Code formatter' },
      { value: 'ESLint', hint: 'Linter' },
      { value: 'Biome.js', hint: 'Formatter and linter' },
    ],
  },
  groupSpacing: 1, // Add one new line between each group
  selectableGroups: false, // Disable selection of top-level groups
  maxItems: 20
});
