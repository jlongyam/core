// Execute an array of async functions in series
async function runSeries(tasks) {
  const results = [];
  for (const task of tasks) {
    const result = await task(); // wait for each task to finish
    results.push(result);
  }
  return results;
}

// Example usage:
const tasks = [
  () => new Promise(resolve => setTimeout(() => resolve("Task 1 done"), 1000)),
  () => new Promise(resolve => setTimeout(() => resolve("Task 2 done"), 500)),
  () => new Promise(resolve => setTimeout(() => resolve("Task 3 done"), 200))
];

runSeries(tasks).then(results => {
  console.log("All tasks finished:", results);
});
