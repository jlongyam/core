# Testing

Cmd can be easily tested.

```js
// 1. Example test input
const cli = new Cmd();

console.log(cli.parse(['-v']))
console.log(cli.parse(['-h']))
```

```javascript
// 2. Example test output
const cli = new Cmd({ name: 'test-cli' });

cli
  .command('test')
  .action((context) => {
    context.cli.log('Success');
  });

await cli.run(['test']);
```
