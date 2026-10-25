import env from '../env.mjs';

const envRuntime = () => {
  if (typeof Deno !== 'undefined' && Deno?.version?.deno) return 'deno';
  if (typeof Bun !== 'undefined' && Bun?.version) return 'bun';
  if (typeof process !== 'undefined' && process.versions?.node) return 'node';

  //if (typeof ServiceWorkerGlobalScope === 'function' && self instanceof ServiceWorkerGlobalScope) return 'service-worker';
  //if (typeof SharedWorkerGlobalScope === 'function' && self instanceof SharedWorkerGlobalScope) return 'shared-worker';
  //if (typeof DedicatedWorkerGlobalScope === 'function' && self instanceof DedicatedWorkerGlobalScope) return 'dedicated-worker';

  //if (typeof window !== 'undefined' && typeof window.document !== 'undefined') return 'browser';

  return 'unknown';
};

env.runtime = detectRuntime();

export default env;