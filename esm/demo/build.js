import { readFile } from 'fs';
import { parse } from 'node-html-parser';
import { assertNotNull } from '../index';
const readFileAsync = (path) => new Promise((resolve, reject) => readFile(path, 'utf-8', (err, data) => (err ? reject(err) : resolve(data))));
const path = require('path');
const htmlPath = path.resolve(__dirname, 'index.html');
const html = assertNotNull(await readFileAsync('index.html'));
const root = parse(html);
const q = root.querySelector('#code');
console.log(q === null || q === void 0 ? void 0 : q.outerHTML);
//# sourceMappingURL=build.js.map