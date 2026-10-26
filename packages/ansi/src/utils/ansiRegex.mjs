const ansiRegex = /(\x1b\[[0-9;]*m)/g; 

function find(str) {
  let a = [];
  let match;
  while ((match = ansiRegex.exec(str)) !== null) {
    a.push(match);
  }
  let filter = [];
  for( let i in a) {
    // Extract codes from the full match (remove \x1b[ and m)
    const codeStr = a[i][0].slice(2, -1);
    filter.push({
      escape: a[i][0].replace(/\x1b/g, "\\x1b"),
      code: codeStr,
      index: a[i]['index']
    })
  } 
  return filter; 
}

export { ansiRegex, find };
