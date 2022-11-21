import { readFile } from 'fs'
import { parse } from 'node-html-parser'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

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
const src = assertNotNull(await readFileAsync(srcPath))

// parse html
const root = parse(html)

// replace the `href`
const codeEl = assertNotNull(root.querySelector('a#bookmarklet ')) as unknown as HTMLAnchorElement
codeEl.setAttribute('href', `javascript:(function(){${ encodeURI(src) }})();`)

console.log(root.outerHTML)
