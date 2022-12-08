import { readFile } from 'fs'
import { parse } from 'node-html-parser'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { minify } from 'terser'

// util
function assert(expression: unknown, message = 'Assertion Error'): asserts expression {
  if (!expression) throw new Error(message)
}
function assertNotNull<T>(expression: T, message?: string): NonNullable<T> {
  assert(expression != null, message)
  return expression
}

const readFileAsync = (path: string): Promise<string> =>
  new Promise((resolve, reject) =>
    readFile(path, 'utf-8', (err, data) => (err ? reject(err) : resolve(data)))
  )

// file paths
const htmlPath = resolve(dirname(fileURLToPath(import.meta.url)), 'placeholder.html')
const srcPath = resolve(dirname(fileURLToPath(import.meta.url)), '../index.js')

// get strings
const html = assertNotNull(await readFileAsync(htmlPath))
const code = assertNotNull(await readFileAsync(srcPath))
const minifiedCode = assertNotNull((await minify(code, { toplevel: true, mangle: true })).code)

// parse html
const root = parse(html)

// replace the `href`
const codeEl = assertNotNull(root.querySelector('a#bookmarklet')) as unknown as HTMLAnchorElement
codeEl.setAttribute('href', `javascript:(function(){${encodeURI(minifiedCode)}})();`)
codeEl.setAttribute('poo', minifiedCode)

console.log(root.outerHTML)
