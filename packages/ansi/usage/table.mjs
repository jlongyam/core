import Table from "@jlbyte/ansi/table";

let table = new Table({
  head: ['TH 1 label', 'TH 2 label'],
  colWidths: [20, 40]
});

table.push(
  ['First value', 'Second value'],
  ['First value', 'Second value']
);

console.log(table.toString());
