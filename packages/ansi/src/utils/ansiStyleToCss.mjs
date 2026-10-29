function ansiStyleToCss(ansiCode) {
  const styleMap = {
    1: { 'font-weight': 'bold' },
    2: { 'opacity': '0.6' },
    3: { 'font-style': 'italic' },
    4: { 'text-decoration': 'underline' },
    5: { 'animation': 'blink 1s steps(5, start) infinite' },
    7: { 'filter': 'invert(100%)' },
    8: { 'visibility': 'hidden' },
    9: { 'text-decoration': 'line-through' }
  };
  const matches = ansiCode.match(/\d+/g);
  if (!matches) return {};
  let combinedStyles = {};
  for (const match of matches) {
    const num = parseInt(match, 10);
    if (num === 0) {
      return {};
    }
    if (styleMap[num]) {
      Object.assign(combinedStyles, styleMap[num]);
    }
  }
  return combinedStyles;
}
export default ansiStyleToCss;
