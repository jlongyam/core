import { icon, color, style, html } from '@jlbyte/ansi';
import env from '@jlbyte/env';
import assert from './assert.mjs';

const { fg, bg, fgBright } = color; 
const { cli, browser } = env;

let el_tester;
let el_info_head;

if(browser) {
  el_tester = document.createElement('div');
  el_tester.className = 'tester-runner';
  if(!('test_runner_container' in window)) {
    let el_test_runner_container = document.createElement('div')
    el_test_runner_container.id = 'test_runner_container'
    el_test_runner_container.appendChild(el_tester);
    document.body.appendChild(el_test_runner_container);
  }
  else {
    test_runner_container.appendChild(el_tester);
  }
}
let Test = {
  report: [],
  result: { passed: 0, failed: 0 },
  add: function (name, fn) {
    this.report.push({ name: name, fn: fn });
  },
  run: async function () {
    this.result = { passed: 0, failed: 0 };
    if(browser) {
      var el_group = document.createElement('div');
      el_group.className = 'tester-runner__group';
      el_tester.appendChild(el_group);
      var el_test_head = document.createElement('div');
      el_test_head.className = 'tester-runner__group--head';
      el_test_head.innerHTML += html(style.underline('Test'));
      el_group.appendChild(el_test_head);
    }
    if(cli) {
      console.group(`\n${style.underline('Test')}\n`);
    }
    for (var i = 0; i < this.report.length; i++) {
      var test = this.report[i];
      if(browser) {
        var el_test = document.createElement('div');
        el_test.className = 'tester-runner__group--test';
        el_group.appendChild(el_test);
      }
      try {
        const result = test.fn();
        if (result && typeof result.then === 'function') {
          await result;
        }
        this.result.passed++;
        if(cli) {
          console.log(`${fg.green(icon.ok)} ${fgBright.blue(test.name)}`);
        }
        if(browser) {
          el_test.innerHTML += html(`${fg.green(icon.ok)} ${fgBright.blue(test.name)}`)
        }
      } catch (e) {
        this.result.failed++;
        if(cli) {
          console.log(`${fgBright.red(icon.fail)} ${fgBright.red(test.name)}`);
          console.groupCollapsed();
            console.log(fgBright.black(e.message));
          console.groupEnd();
        }
        if(browser) {
          el_test.innerHTML += html(`${fgBright.red(icon.fail)} ${fgBright.red(test.name)}`);
          var el_test_sub = document.createElement('div');
          el_test_sub.className = 'tester-runner__group--test__sub';
          el_test_sub.innerHTML += html(fgBright.black(e.message))
          el_test.appendChild(el_test_sub);
        }
      }
    }
    if(cli) {
      console.groupEnd();
      console.group(`\n${style.underline('Result')}\n`);
        console.info(`${bg.green(fgBright.white(` ${this.result.passed} `))} ${fg.green('passed')}, ${bg.red(fgBright.white(` ${this.result.failed} `))} ${fgBright.red('failed')}`);
      console.groupEnd();
    }
    if(browser) {
      var el_info = document.createElement('div');
      el_info.className = 'tester-runner__info';
      el_tester.appendChild(el_info);
      el_info_head = document.createElement('div');
      el_info_head.className = 'tester-runner__info--head'
      el_info_head.innerHTML = html(style.underline('Result'));
      el_info.appendChild(el_info_head);
      var el_info_result = document.createElement('div');
      el_info_result.className = 'tester-runner__info--result';
      el_info_result.innerHTML = html(`${bg.green(fgBright.white(` ${this.result.passed} `))} ${fg.green('passed')}, ${bg.red(fgBright.white(` ${this.result.failed} `))} ${fgBright.red('failed')}`);
      el_info.appendChild(el_info_result);
    }
  }
};
function test(name, fn) {
  Test.add(name, fn);
}
function run() {
  return Test.run();
}
export { assert, test, run };
