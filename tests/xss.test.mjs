import test from 'node:test'
import assert from 'node:assert/strict'
import { renderMarkdown } from '../app/lib/markdown.ts'

const payloads = [
  '<script>alert(1)</script>',
  '[x](javascript:alert(1))',
  '![a" onerror="alert(1)](https://e.com/a.png)',
  '![x](javascript:alert(1))',
  '[x](https://e.com/" onmouseover="alert(1))',
  '<img src=x onerror=alert(1)>',
  '`</code><script>alert(1)</script>`',
]
test('le rendu Markdown n’insère aucun HTML actif', () => {
  for (const p of payloads) {
    const html = renderMarkdown(p)
    assert.doesNotMatch(html, /<script|href="javascript:|<[^>]*\son\w+=(?!&quot;)/i, p + " -> " + html)
  }
})
