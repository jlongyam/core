'use strict'

// Minimal ANSI (SGR) -> HTML converter for the codes produced by ./color.mjs and
// ./style.mjs: `ESC[<code>m ... ESC[0m`, possibly nested.
//
// Only SGR sequences are interpreted. Everything else is dropped, and the text
// itself is HTML-escaped before it is wrapped in a span.

const SGR = /\x1b\[([0-9;]*)m/g
const OTHER_CSI = /\x1b\[[0-9;:?]*[A-LN-Za-ln-z]/g

// Same palette as ansi.css: 0-7 normal, 8-15 bright.
const PALETTE = [
  '#2e3436', '#cc0000', '#4e9a06', '#c4a000',
  '#3465a4', '#75507b', '#06989a', '#d3d7cf',
  '#555753', '#ef2929', '#8ae234', '#fce94f',
  '#729fcf', '#ad7fa8', '#34e2e2', '#eeeeec'
]

const TEXT_STYLE = {
  1: 'bold',
  2: 'dim',
  3: 'italic',
  4: 'underline',
  5: 'blink',
  6: 'rapid',
  7: 'inverse',
  8: 'invisible',
  9: 'strike'
}

function toHex (r, g, b) {
  return '#' + [r, g, b].map(function (value) {
    return ('0' + (value & 255).toString(16)).slice(-2)
  }).join('')
}

function ansi256 (n) {
  if (n < 16) return PALETTE[n]
  if (n < 232) {
    const levels = [0, 95, 135, 175, 215, 255]
    const index = n - 16
    return toHex(
      levels[Math.floor(index / 36)],
      levels[Math.floor(index / 6) % 6],
      levels[index % 6]
    )
  }
  const grey = 8 + (n - 232) * 10
  return toHex(grey, grey, grey)
}

function blank () {
  return {
    fg: null,
    bg: null,
    bold: false,
    dim: false,
    italic: false,
    underline: false,
    blink: false,
    rapid: false,
    inverse: false,
    invisible: false,
    strike: false
  }
}

function apply (state, codes) {
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i]
    if (code === 0) {
      const fresh = blank()
      for (const key in fresh) state[key] = fresh[key]
    } else if (code === 22) {
      state.bold = state.dim = false
    } else if (code === 23) {
      state.italic = false
    } else if (code === 24) {
      state.underline = false
    } else if (code === 25) {
      state.blink = state.rapid = false
    } else if (code === 27) {
      state.inverse = false
    } else if (code === 28) {
      state.invisible = false
    } else if (code === 29) {
      state.strike = false
    } else if (code === 39) {
      state.fg = null
    } else if (code === 49) {
      state.bg = null
    } else if (TEXT_STYLE[code]) {
      state[TEXT_STYLE[code]] = true
    } else if (code >= 30 && code <= 37) {
      state.fg = PALETTE[code - 30]
    } else if (code >= 90 && code <= 97) {
      state.fg = PALETTE[code - 90 + 8]
    } else if (code >= 40 && code <= 47) {
      state.bg = PALETTE[code - 40]
    } else if (code >= 100 && code <= 107) {
      state.bg = PALETTE[code - 100 + 8]
    } else if (code === 38 || code === 48) {
      const mode = codes[i + 1]
      if (mode === 5) {
        const hex = ansi256(codes[i + 2])
        if (code === 38) state.fg = hex
        else state.bg = hex
        i += 2
      } else if (mode === 2) {
        const hex = toHex(codes[i + 2], codes[i + 3], codes[i + 4])
        if (code === 38) state.fg = hex
        else state.bg = hex
        i += 4
      }
    }
  }
}

function styleOf (state) {
  const css = []
  const fg = state.inverse ? state.bg : state.fg
  const bg = state.inverse ? state.fg : state.bg

  if (fg) css.push('color:' + fg)
  if (bg) css.push('background-color:' + bg)
  if (state.bold) css.push('font-weight:bold')
  if (state.dim) css.push('opacity:.8')
  if (state.italic) css.push('font-style:italic')

  const decoration = []
  if (state.underline) decoration.push('underline')
  if (state.strike) decoration.push('line-through')
  if (decoration.length) css.push('text-decoration:' + decoration.join(' '))

  if (state.invisible) css.push('visibility:hidden')

  return css.join(';')
}

function escapeHtml (text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function render (state, text) {
  if (!text) return ''
  const safe = escapeHtml(text)
  const css = styleOf(state)
  return css ? '<span style="' + css + '">' + safe + '</span>' : safe
}

function html (input) {
  if (typeof input !== 'string') return ''

  const text = input.replace(OTHER_CSI, '')
  const out = []
  const state = blank()
  let last = 0

  SGR.lastIndex = 0
  let match
  while ((match = SGR.exec(text)) !== null) {
    out.push(render(state, text.slice(last, match.index)))
    const codes = match[1] ? match[1].split(';').map(Number) : [0]
    apply(state, codes)
    last = SGR.lastIndex
  }
  out.push(render(state, text.slice(last)))

  return out.join('')
}

export default html
