import Progress from "@jlbyte/ansi/progress";

let bar = new Progress('downloading [:bar] :rate/bps :percent :etas', { total: 50 });
let action = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('complete');
    clearInterval(action);
  }
}, 100);
