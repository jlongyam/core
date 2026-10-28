# Testing

ArgParser can be easily tested. See `cli-tester.js` for a comprehensive testing framework.

```javascript
// Example test
const cli = new ArgParser({ name: 'test-cli' });

cli.command('test').action((context) => {
  context.cli.log('Success');
});

await cli.run(['test']);
```
