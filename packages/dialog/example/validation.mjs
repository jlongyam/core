import { text, select, groupMultiselect, isCancel } from '@jlbyte/dialog';

async function setupConfig() {
  const port = await text({
    message: 'Enter port number:',
    placeholder: '3000',
    validate: (value) => {
      if (!value) return 'Please enter a value';
      const num = parseInt(value);
      if (isNaN(num)) return 'Please enter a valid number';
      if (num < 1 || num > 65535) return 'Port must be between 1 and 65535';
      return undefined;
    }
  });

  if (isCancel(port)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const host = await text({
    message: 'Enter host:',
    placeholder: 'localhost',
    validate: (value) => {
      if (!value) return 'Host is required';
      if (!/^[a-zA-Z0-9.-]+$/.test(value)) return 'Invalid host format';
      return undefined;
    },
  });

  if (isCancel(host)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const mode = await select({
    message: 'Select mode:',
    options: [
      { value: 'development', label: 'Development', hint: 'For local development' },
      { value: 'production', label: 'Production', hint: 'For production deployment' },
    ]
  });

  if (isCancel(mode)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const database = await select({
    message: 'Select database:',
    options: [
      { value: 'postgres', label: 'PostgreSQL', hint: 'Advanced open source database' },
      { value: 'mysql', label: 'MySQL', hint: 'Most popular open source database' },
      { value: 'mongodb', label: 'MongoDB', hint: 'Document-oriented database' },
    ],
  });

  if (isCancel(database)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const dbUrl = await text({
    message: 'Enter database URL:',
    placeholder: `postgresql://user:pass@localhost:5432/db`,
    validate: (value) => {
      if (!value) return 'Database URL is required';
      try {
        new URL(value);
        return undefined;
      } catch {
        return 'Invalid URL format';
      }
    },
  });

  if (isCancel(dbUrl)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const features = await groupMultiselect({
    message: 'Select features:',
    options: {
      'Security': [
        { value: 'auth', label: 'Authentication', hint: 'User authentication' },
        { value: 'cors', label: 'CORS', hint: 'Cross-origin resource sharing' },
      ],
      'Monitoring': [
        { value: 'logging', label: 'Logging', hint: 'Application logging' },
        { value: 'metrics', label: 'Metrics', hint: 'Performance metrics' },
      ],
      'Development': [
        { value: 'swagger', label: 'Swagger', hint: 'API documentation' },
        { value: 'debug', label: 'Debug', hint: 'Debugging tools' },
      ],
    },
  });

  if (isCancel(features)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  return {
    port: Number(port),
    host,
    mode: mode,
    features,
    database: {
      type: database,
      url: dbUrl,
    },
  };
}

const config = await setupConfig();
console.log(config);