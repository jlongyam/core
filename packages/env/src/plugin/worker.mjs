// /src/plugin/worker.mjs
import env from './global.mjs';

const getWorkerType = () => {
  //if (!env.worker) return null;

  //const g = env.global || globalThis;

  // Service Worker: has ServiceWorkerGlobalScope and is an instance of it
  if (typeof ServiceWorkerGlobalScope === 'function' && env.global instanceof ServiceWorkerGlobalScope) {
    return 'service';
  }

  // Shared Worker: has SharedWorkerGlobalScope and is an instance of it
  if (typeof SharedWorkerGlobalScope === 'function' && g instanceof SharedWorkerGlobalScope) {
    return 'shared';
  }

  // Dedicated Worker: has DedicatedWorkerGlobalScope and is an instance of it
  if (typeof DedicatedWorkerGlobalScope === 'function' && g instanceof DedicatedWorkerGlobalScope) {
    return 'dedicated';
  }

  // Fallback: if it's a worker but the subtype cannot be determined
  return 'unknown';
};

env.workerType = getWorkerType();

const envWorker = (()=> {
  if (typeof ServiceWorkerGlobalScope === 'function' && env.global instanceof ServiceWorkerGlobalScope) return 'service-worker';
  if (typeof SharedWorkerGlobalScope === 'function' && env.global instanceof SharedWorkerGlobalScope) return 'shared-worker';
  if (typeof DedicatedWorkerGlobalScope === 'function' && env.global instanceof DedicatedWorkerGlobalScope) return 'dedicated-worker';
})();

export default env;