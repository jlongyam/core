import sade from 'sade';
// 1. original
class Cmd {
  constructor(name = 'cli', single = false) {
    return sade(name, single)
  }
}
export default Cmd

// import sade from 'sade';
// 2. using this
// class Cmd {
//   constructor(name = 'cli', single = false) {
//     this.cli = sade(name, single);
//   }
//   // docs layer
//   describe(text) {
//     this.cli.describe(text);
//     return this;
//   }
//   // delegate the parts
//   command(spec) {
//     return this.cli.command(spec);
//   }
//   option(spec) {
//     this.cli.option(spec);
//     return this;
//   }
//   action(fn) {
//     this.cli.action(fn);
//     return this;
//   }
//   parse(argv = process.argv) {
//     return this.cli.parse(argv);
//   }
// }

// export default Cmd;
// import sade from 'sade';
// // 3. using proxy
// class Cmd {
//   constructor(name = 'cli', single = false) {
//     const cli = sade(name, single);
//     return new Proxy(cli, {
//       get(target, prop, receiver) {
//         const value = Reflect.get(target, prop, target);
//         if (typeof value !== 'function') return value;
//         return (...args) => {
//           const result = value.apply(target, args);
//           return result === target ? receiver : result;
//         };
//       },
//     });
//   }
// }

// export default Cmd;