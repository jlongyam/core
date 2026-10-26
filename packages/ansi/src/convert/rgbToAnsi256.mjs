function rgbToAnsi256(r, g, b) {
  if (r ^ g || g ^ b) {
    return 16 + (36 * Math.round(r / 51)) + (6 * Math.round(g / 51)) + Math.round(b / 51);
  }
  if (8 > r) return 16;
  if (r > 248) return 231;
  return Math.round(((r - 8) * 24) / 247) + 232;
}

export default rgbToAnsi256;