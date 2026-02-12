import { icon, color, bg, style } from '@jlongyam/ansi';
import env from '@jlongyam/env';

let Test = {
  report: [],
  result: { passed: 0, failed: 0 },
  add: function (name, fn) {
    this.report.push({ name: name, fn: fn });
  },
  run: function () {
    this.result = { passed: 0, failed: 0 };
    console.group(`\n${style.underline('Test')}\n`);
    for (var i = 0; i < this.report.length; i++) {
      var test = this.report[i];
      try {
        test.fn();
        this.result.passed++;
        console.log(`${color.green(icon.ok)} ${color.blue(test.name)}`)
      } catch (e) {
        this.result.failed++;
        console.log(`${color.red(icon.notOk)} ${color.red(test.name)}`);
        console.groupCollapsed()
          console.log(`${style.dim(e.message)}`);
        console.groupEnd()
      }
    }
    console.groupEnd();
    console.group(`\n${style.underline('Result')}\n`);
      console.info(`${bg.green(color.black(` ${this.result.passed} `))} ${color.green('passed')}, ${bg.red(` ${this.result.failed} `)} ${color.red('failed')}`);
    console.groupEnd();
    
    if (env.cli && this.result.failed > 0) {
      process.exit(1);
    }
  }
};

function it(name, fn) {
  Test.add(name, fn);
}
function run() {
  Test.run()
}
export { it, run };