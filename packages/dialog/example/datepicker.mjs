import { date, isCancel, cancel, outro } from '@clack/prompts';

async function pickReleaseDate() {
  const result = await date({
    message: 'Pick a release date',
    format: 'YMD',
    minDate: new Date('2026-01-01'),
    maxDate: new Date('2026-12-31'),
  });

  if (isCancel(result)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  outro(`Selected: ${result.toISOString().slice(0, 10)}`);
}

await pickReleaseDate()
//const userDate = await pickReleaseDate();
//console.log(userDate);