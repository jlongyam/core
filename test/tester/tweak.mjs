import { it, run } from '../../src/tester/tweak.mjs';

// Sync test
it('should add numbers correctly', () => {
  if (1 + 1 !== 2) throw new Error('Math is broken');
});

// Async test with Promise
it('should fetch data', async () => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  if (!data.id) throw new Error('No ID in response');
});

// Or with explicit Promise
it('should timeout', () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'));
    }, 1000);
  });
});

// Run all tests
await run(); // Or run().then(() => console.log('Done'));