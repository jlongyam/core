import { assert, test, run } from '@jlbyte/tester';
import Cmd from './Cmd.mjs';

test('new Cmd(default)', ()=> {
  let cli = new Cmd();
  
  assert.equal(cli.name, 'cli');
  assert.equal(cli.version, '1.0.0');
  assert.equal(cli.description, 'CLI application')
});
test('cli(config)', ()=> {
  let cli = new Cmd({
    name: 'my-app',
    version: '1.0.1',
    description: 'My App'
  });
  
  assert.equal(cli.name, 'my-app');
  assert.equal(cli.version, '1.0.1');
  assert.equal(cli.description, 'My App')
});
test('cli.command()', ()=> {
  let cli = new Cmd();
  let cmd = cli.command('test', { description: 'Description of test' });
  
  assert.ok(cli.commands.has('test'));
  assert.equal(cmd.name, 'test');
  assert.equal(cmd.description, 'Description of test');
});
test('cli.default()', ()=> {
  let cli = new Cmd();
  cli.default('help');

  assert.equal(cli.defaultCommand, 'help');
});
test('cli.option()', ()=> {
  let cli = new Cmd();
  let cmd = cli
    .command('test')
    .option('-v, --verbose', 'Enable verbose output');
  
  assert.ok(cmd.options.has('verbose'));

  let opts = cmd.options.get('verbose');
  
  assert.equal(opts.short, '-v');
  assert.equal(opts.long, '--verbose');
  assert.equal(opts.name, 'verbose');
});
test('cli.argument()', ()=> {
  let cli = new Cmd();
  let cmd = cli
    .command('test')
    .argument('name', 'argument - name', true)
    .argument('title', 'argument - title', false);

  assert.equal(cmd.args.length, 2);
  assert.equal(cmd.args[0].name, 'name');
  assert.equal(cmd.args[0].required, true);
  assert.equal(cmd.args[1].name, 'title');
  assert.equal(cmd.args[1].required, false)
});
test('cli.parse([])', ()=> {
  let cli = new Cmd();
  cli.command('hello');
  
  let parsed = cli.parse(['hello']);
  
  assert.equal(parsed.command, 'hello');
  assert.equal(parsed.args.length, 0);
});
test('cli.parse([...])', ()=> {
  let cli = new Cmd();
  cli.command('hello');
  
  let parsed = cli.parse(['hello', 'world']);
  
  assert.equal(parsed.command, 'hello');
  assert.ok(parsed.args.includes('world'));  
  
  assert.ok(parsed.command);
  assert.ok(parsed.args);
  assert.ok(parsed.options);
});
test('cli.generateHelp()', ()=> {
  let cli = new Cmd();
  let help = cli.generateHelp();

  assert.ok(help.includes('cli'));
  assert.ok(help.includes('[command]'));
  assert.ok(help.includes('[options]'));
});
test('cli.action()', async ()=> {
  let cli = new Cmd();
  let executed = false;
  cli.command('test').action(()=> {
    executed = true
  });
  await cli.run(['test']);
  
  assert.ok(executed);
});
test('cli.action((context))', async ()=> {
  let cli = new Cmd();
  let contextual = null;
  cli.command('test').action((context)=> {
    contextual = context
  });
  
  await cli.run(['test']);
  
  assert.equal(contextual.command, 'test');
});
test('cli.use()', async()=> {
  let cli = new Cmd();
  let order = [];
  cli.use(async ()=> {
    order.push('by_use')
  });
  cli.command('test').action(()=> {
    order.push('by_action');
  })
  await cli.run(['test'])
  
  assert.deepEqual(order, ['by_use', 'by_action']);
});
test('cli.parseOption()', ()=> {
  let cli = new Cmd();
  let option = cli.parseOption('-v, --verbose');

  assert.equal(option.name, 'verbose');
  assert.equal(option.short, '-v');
  assert.equal(option.long, '--verbose')
});
await run();