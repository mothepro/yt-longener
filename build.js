import { readFile } from 'fs';
import { parse } from 'node-html-parser';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
// util
function assert(expression, message = 'Assertion Error') {
    if (!expression)
        throw new Error(message);
}
function assertNotNull(expression, message) {
    assert(expression != null, message);
    return expression;
}
const readFileAsync = (path) => new Promise((resolve, reject) => readFile(path, 'utf-8', (err, data) => (err ? reject(err) : resolve(data))));
// file paths
const htmlPath = resolve(dirname(fileURLToPath(import.meta.url)), 'placeholder.html');
const srcPath = resolve(dirname(fileURLToPath(import.meta.url)), '../index.js');
// get strings
const html = assertNotNull(await readFileAsync(htmlPath));
const src = assertNotNull(await readFileAsync(srcPath));
// parse html
const root = parse(html);
// replace the `href`
const codeEl = assertNotNull(root.querySelector('a#code'));
codeEl.setAttribute('href', `javascript:(function(){${encodeURI(src)}})();`);
console.log(root.outerHTML);
