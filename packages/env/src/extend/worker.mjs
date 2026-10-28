import env from "../env.mjs";

const envWorker = () => {
  if ( typeof WorkerGlobalScope !== 'undefined' && globalThis instanceof WorkerGlobalScope) return 'webWorker';
  if (typeof ServiceWorkerGlobalScope === 'function' && env.global instanceof ServiceWorkerGlobalScope) return 'serviceWorker';
  if (typeof SharedWorkerGlobalScope === 'function' && g instanceof SharedWorkerGlobalScope) return 'sharedWorker';
  if (typeof DedicatedWorkerGlobalScope === 'function' && g instanceof DedicatedWorkerGlobalScope) return 'dedicatedWorker';
  return 'unknown';
};

env.worker = envWorker();

export default env;