const execution = {
  series: async (tasks) => {
    const results = [];
    for (const task of tasks) {
      results.push(await task());
    }
    return results;
  },

  parallel: async (tasks) => {
    return Promise.all(tasks.map(task => task()));
  }
};

// Example usage:
const tasks = [
  () => Promise.resolve("A"),
  () => Promise.resolve("B"),
  () => Promise.resolve("C")
];

execution.series(tasks).then(console.log);   // ["A", "B", "C"]
execution.parallel(tasks).then(console.log); // ["A", "B", "C"]

/* series
for (const task of tasks) {
  await task();
}
  */
/* parallel
await Promise.all(tasks.map(task => task()));

 */
