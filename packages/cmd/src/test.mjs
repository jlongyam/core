import { assert, it, run } from '@jlbyte/tester';
import Cmd from './Cmd.mjs';

it('Construtor', ()=> {
  let cli = new Cmd();
  
  assert.equal(cli.name, 'cli');
  assert.equal(cli.version, '1.0.0');
  assert.equal(cli.description, 'CLI application')
});

it('Instance', ()=> {
  let cli = new Cmd({
    name: 'my-app',
    version: '1.0.1',
    description: 'My App'
  });
  
  assert.equal(cli.name, 'my-app');
  assert.equal(cli.version, '1.0.1');
  assert.equal(cli.description, 'My App')
});

it('Instance: commands', ()=> {
  let cli = new Cmd();
  let cmd = cli.command('test', { description: 'Description of test' });
  
  assert.ok(cli.commands.has('test'));
  assert.equal(cmd.name, 'test');
  assert.equal(cmd.description, 'Description of test');
});

it('Instance: defaultCommand', ()=> {
  let cli = new Cmd();
  cli.default('help');

  assert.equal(cli.defaultCommand, 'help');
});

it('Instance: option', ()=> {
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


await run()