#!/usr/bin/env node

const read = JSON.parse;
const write = JSON.stringify;

const env = {
    '+': (...args) => args.reduce((a, b) => a + b),
    '-': (...args) => args.reduce((a, b) => a - b),
    '*': (...args) => args.reduce((a, b) => a * b),
    '/': (...args) => args.reduce((a, b) => a / b),
    '=': (a, b) => a == b,
    '==': (a, b) => a === b,
    '<': (a, b) => a < b,
    '>': (a, b) => a > b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '%': (a, b) => a % b
};

function evaluate(ast, scope) {
    if (!Array.isArray(ast)) {
        return ast;
    }

    const [ head, ...rest ] = ast.map(el => evaluate(el, scope));
    return scope[head](...rest);
}

require('repl').start({
    eval: (cmd, context, filename, callback) => callback(null, evaluate(read(cmd), env)),
    writer: write
});
