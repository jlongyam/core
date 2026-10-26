import { text, select, isCancel } from '@clack/prompts';

async function timedPrompt() {
  // Auto-cancel after 30 seconds
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const name = await text({
      message: 'Quick! Enter your name (30 second limit):',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (isCancel(name)) {
      console.log('Time ran out or cancelled');
      return;
    }

    console.log(`Hello, ${name}!`);
  } catch (error) {
    console.log('Prompt was aborted');
  }
}

// Racing prompts - first response wins
async function racePrompts() {
  const controller = new AbortController();

  const result = await Promise.race([
    // Option 1: Manual selection
    select({
      message: 'Choose a framework:',
      options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
      ],
      signal: controller.signal,
    }),
    // Option 2: Auto-detect (simulated)
    new Promise(resolve => {
      setTimeout(() => {
        resolve('detected-framework');
        controller.abort();
      }, 5000);
    }),
  ]);

  console.log(`Using: ${String(result)}`);
}

await timedPrompt();
await racePrompts();