import env from "../env.mjs";

const envRuntime = () => {
  if (typeof Deno !== 'undefined' && Deno?.version?.deno) return 'deno';
  if (typeof Bun !== 'undefined' && Bun?.version) return 'bun';
  if (typeof process !== 'undefined' && process.versions?.node) return 'node';
  return 'unknown';
};

env.runtime = envRuntime();

export default env;
