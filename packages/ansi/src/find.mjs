const regex = /\x1b\[([0-9;]*)m/g;

function find(str) {
  let a = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    a.push(match);
  }
  let filter = [];
  for( let i in a) {
    filter.push({
      escape: a[i][0].replace(/\x1b/g, "\\x1b"),
      code: a[i][1],
      index: a[i]['index']
    })
  } 
  return filter; 
}

export default find;
