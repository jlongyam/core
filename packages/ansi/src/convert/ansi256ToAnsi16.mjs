function ansi256ToAnsi16(code) {
  let r, g, b, value, remainder;
  if (8 > code) return 30 + code;
  if (16 > code) return 90 + (code - 8);
  if (232 > code) {
    code -= 16;
    remainder = code % 36;
    r = (code / 36 | 0) / 5;
    g = (remainder / 6 | 0) / 5;
    b = (remainder % 6) / 5;
  } else {
    r = g = b = (((code - 232) * 10) + 8) / 255;
  }
  value = Math.max(r, g, b) * 2;
  return value ? 30 + (Math.round(b) << 2 | Math.round(g) << 1 | Math.round(r)) + (2 ^ value ? 0 : 60) : 30;
}

export default ansi256ToAnsi16;