# Best Practices

## 1. Use Descriptive Names

```javascript
// Good
cli.command('deploy-production', { description: 'Deploy to production' });

// Avoid
cli.command('dp', { description: 'Deploy' });
```

## 2. Validate Input

```javascript
cli
  .command('create')
  .argument('name', 'Project name')
  .action((context) => {
    const name = context.args[0];
    
    if (!/^[a-z0-9-]+$/.test(name)) {
      throw new Error('Name must be lowercase alphanumeric with hyphens');
    }
    
    // Proceed with creation
  });
```

## 3. Provide Helpful Feedback

```javascript
cli
  .command('install')
  .action((context) => {
    context.cli.log('Installing packages...', 'cyan');
    // Installation logic
    context.cli.log('√ Installation complete', 'green');
  });
```

## 4. Use Middleware for Common Tasks

```javascript
// Authentication
cli.use(async (context) => {
  if (requiresAuth(context.command)) {
    await authenticate();
  }
});

// Configuration loading
cli.use(async (context) => {
  context.config = await loadConfig();
});
```

## 5. Handle Async Operations

```javascript
cli
  .command('fetch')
  .action(async (context) => {
    try {
      const data = await fetchData();
      console.log(data);
    } catch (error) {
      context.cli.error(`Failed to fetch: ${error.message}`);
      process.exit(1);
    }
  });
```
