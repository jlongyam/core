function ansiStyleToCss(ansiCode) {
    // Map standard ANSI text style codes to CSS properties
    const styleMap = {
        1: { 'font-weight': 'bold' },
        2: { 'opacity': '0.6' },           // Dim / Faint
        3: { 'font-style': 'italic' },
        4: { 'text-decoration': 'underline' },
        5: { 'animation': 'blink 1s steps(5, start) infinite' }, // Blink
        7: { 'filter': 'invert(100%)' },   // Invert foreground/background
        8: { 'visibility': 'hidden' },     // Hidden
        9: { 'text-decoration': 'line-through' } // Strikethrough
    };

    const matches = ansiCode.match(/\d+/g);
    if (!matches) return {};

    let combinedStyles = {};

    for (const match of matches) {
        const num = parseInt(match, 10);

        // If it's a reset code (0), immediately drop all styles
        if (num === 0) {
            return {};
        }

        // If the style code exists in our map, merge it into the result
        if (styleMap[num]) {
            Object.assign(combinedStyles, styleMap[num]);
        }
    }

    return combinedStyles;
}

// --- Practical CSS Mapping Examples ---

// 1. Parse Bold & Italic together: "\x1b[1;3m"
console.log(ansiStyleToCss('\x1b[1;3m'));
// Output: { 'font-weight': 'bold', 'font-style': 'italic' }

// 2. Parse Dim / Faint: "\x1b[2m"
console.log(ansiStyleToCss('\x1b[2m'));
// Output: { 'opacity': '0.6' }

// 3. Reset Code: "\x1b[0m" clears out all styles
console.log(ansiStyleToCss('\x1b[0m'));
// Output: {} (Empty object perfectly drops active CSS rules)
