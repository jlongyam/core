import { TERMINAL_PALETTE } from './color16palette.mjs';
import ansi16ToHex from './ansi16ToHex.mjs';
import ansi256ToAnsi16 from './ansi256ToAnsi16.mjs';
import ansiStyleToCss from './ansiStyleToCss.mjs';
import escapeHtml from './escapeHtml.mjs';
import { ansiRegex } from './ansiRegex.mjs';

export function ansiToHtml(text, palette = TERMINAL_PALETTE) {
  // Regex splits text by any standard ANSI ESC sequence block
  // const regex = /(\x1B\[[0-9;]*m)/g;
  const parts = text.split(ansiRegex);

  let result = '';
  let openSpans = 0;

  // Track active styling states globally across the parts sequence loop
  let activeStyles = {};
  let activeFg = null;
  let activeBg = null;

  for (const part of parts) {
    if (part.startsWith('\x1B[')) {
      // Extract code arrays as integer sets
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
        // Handle 256-color or Truecolor sequences (Foreground: 38, Background: 48)
        else if (code === 38 || code === 48) {
          const mode = codes[i + 1];
          const isBg = (code === 48);

          if (mode === 5) {
            // 256 Color Mode: \x1b[38;5;INDEXm
            const colorIndex = codes[i + 2];
            if (colorIndex !== undefined) {
              // Downsample the 256 color to 16 color integer using your library
              const downsampled16 = ansi256ToAnsi16(colorIndex);
              // Map downsampled integer to hex code using your palette wrapper
              const hexColor = ansi16ToHex(`\x1B[${downsampled16}m`, palette);

              if (isBg) activeBg = hexColor;
              else activeFg = hexColor;
            }
            i += 3;
          } else if (mode === 2) {
            // RGB Truecolor Mode: \x1b[38;2;R;G;Bm
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
        // Fallback to standard style map or standard 16 colors
        else {
          // Extract styles matching code definitions
          const partialStyles = ansiStyleToCss(`\x1B[${code}m`);
          if (Object.keys(partialStyles).length > 0) {
            Object.assign(activeStyles, partialStyles);
          } else {
            // Parse native standard 16 foreground or background colors
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

      // Always close existing span wrappers before establishing new state groups
      while (openSpans > 0) {
        result += '</span>';
        openSpans--;
      }

      // Build out inline-styles string container object
      const inlineStyles = [];

      // Add custom visual decorators
      Object.entries(activeStyles).forEach(([prop, val]) => {
        inlineStyles.push(`${prop}: ${val}`);
      });
      // Append color specifications dynamically derived from parsing functions
      if (activeFg) inlineStyles.push(`color: ${activeFg}`);
      if (activeBg) inlineStyles.push(`background-color: ${activeBg}`);

      // Apply calculated visual components onto the active text slice
      if (inlineStyles.length > 0) {
        result += `<span style="${inlineStyles.join('; ')}">`;
        openSpans++;
      }
    } else {
      // Raw text node parsing blocks without tags
      if (part) {
        result += escapeHtml(part);
      }
    }
  }

  // Unpack remaining unclosed structures safely
  while (openSpans > 0) {
    result += '</span>';
    openSpans--;
  }

  return result;
}

export default ansiToHtml;

