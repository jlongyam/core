import { TERMINAL_PALETTE } from './color16palette.mjs';
import ansi16ToHex from './ansi16ToHex.mjs';
import ansi256ToAnsi16 from './ansi256ToAnsi16.mjs';
import ansiStyleToCss from './ansiStyleToCss.mjs';
import escapeHtml from './escapeHtml.mjs';
import { ansiRegex } from './ansiRegex.mjs';

function ansiToHtml(text, palette = TERMINAL_PALETTE) {
  const parts = text.split(ansiRegex);
  let result = '';
  let openSpans = 0;
  let activeStyles = {};
  let activeFg = null;
  let activeBg = null;
  for (const part of parts) {
    if (part.startsWith('\x1B[')) {
      const codes = part.replace(/[^0-9;]/g, '').split(';').map(Number);
      let i = 0;
      let resetDetected = false;
      while (i < codes.length) {
        const code = codes[i];
        if (code === 0) {
          resetDetected = true;
          activeStyles = {};
          activeFg = null;
          activeBg = null;
          i++;
        }
        else if (code === 38 || code === 48) {
          const mode = codes[i + 1];
          const isBg = (code === 48);
          if (mode === 5) {
            const colorIndex = codes[i + 2];
            if (colorIndex !== undefined) {
              const downsampled16 = ansi256ToAnsi16(colorIndex);
              const hexColor = ansi16ToHex(`\x1B[${downsampled16}m`, palette);
              if (isBg) activeBg = hexColor;
              else activeFg = hexColor;
            }
            i += 3;
          } else if (mode === 2) {
            const r = codes[i + 2];
            const g = codes[i + 3];
            const b = codes[i + 4];
            if (r !== undefined && g !== undefined && b !== undefined) {
              const hexColor = `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
              if (isBg) activeBg = hexColor;
              else activeFg = hexColor;
            }
            i += 5;
          } else {
            i++;
          }
        }
        else {
          const partialStyles = ansiStyleToCss(`\x1B[${code}m`);
          if (Object.keys(partialStyles).length > 0) {
            Object.assign(activeStyles, partialStyles);
          } else {
            const hex = ansi16ToHex(`\x1B[${code}m`, palette, null);
            if (hex) {
              if ((code >= 40 && code <= 47) || (code >= 100 && code <= 107)) {
                activeBg = hex;
              } else {
                activeFg = hex;
              }
            }
          }
          i++;
        }
      }
      while (openSpans > 0) {
        result += '</span>';
        openSpans--;
      }
      const inlineStyles = [];
      Object.entries(activeStyles).forEach(([prop, val]) => {
        inlineStyles.push(`${prop}: ${val}`);
      });
      if (activeFg) inlineStyles.push(`color: ${activeFg}`);
      if (activeBg) inlineStyles.push(`background-color: ${activeBg}`);
      if (inlineStyles.length > 0) {
        result += `<span style="${inlineStyles.join('; ')}">`;
        openSpans++;
      }
    } else {
      if (part) {
        result += escapeHtml(part);
      }
    }
  }
  while (openSpans > 0) {
    result += '</span>';
    openSpans--;
  }
  return result;
}

export default ansiToHtml;
