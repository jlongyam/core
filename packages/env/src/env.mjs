const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
const isWorker = typeof importScripts !== "undefined" || (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope);
const isCLI = !isBrowser && !isWorker;

const env = {
  browser: isBrowser,
  worker: isWorker,
  cli: isCLI
};

export default env;