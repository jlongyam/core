import { TERMINAL_PALETTE } from './color16palette.mjs';

function ansi16ToHex(ansiCode, palette = TERMINAL_PALETTE, defaultHex = '#00000000') {
  const matches = ansiCode.match(/\d+/g);

  if (!matches) return defaultHex;
  for (const match of matches) {
    const num = parseInt(match, 10);
    if (num === 0) return defaultHex;
    if (num >= 30 && num <= 37) return palette[num - 30];
    if (num >= 40 && num <= 47) return palette[num - 40];
    if (num >= 90 && num <= 97) return palette[num - 90 + 8];
    if (num >= 100 && num <= 107) return palette[num - 100 + 8];
  }
  return defaultHex;
}

export default ansi16ToHex;