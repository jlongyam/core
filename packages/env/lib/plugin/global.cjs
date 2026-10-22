'use strict'

const env = require('../env.cjs')

env.global = (()=> {
  if (typeof globalThis === 'object') return globalThis
  if (typeof global === 'object') return global
  if (typeof self === 'object') return self
  if (typeof window === 'object') return window
  return {}
})()
