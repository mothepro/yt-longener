export function assert(expression, message = 'Assertion Error') {
    if (!expression)
        throw new Error(message);
}
export function assertNotNull(expression, message) {
    assert(expression != null, message);
    return expression;
}
try {
    const { host, pathname } = location;
    assert(host.includes('youtube.com'), 'Must be on youtube to use this bookmarklet');
    const [, id] = assertNotNull(pathname.match(/\/[a-zA-Z0-9_]+\/([a-zA-Z0-9_]+)/), 'Can not find youtube video id');
    location.href = `https://youtu.be/${id}`;
}
catch (err) {
    assert(err instanceof Error);
    alert(err.message);
}
//# sourceMappingURL=index.js.map