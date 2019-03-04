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

function resolve(ast, scope) {
    if (Array.isArray(ast)) {
        return ast.map(el => evaluate(el, scope));
    }

    return scope[ast] || ast;
}

function evaluate(ast, scope) {
    if (!Array.isArray(ast)) {
        return resolve(ast, scope);
    }

    const [ head, ...rest ] = resolve(ast, scope);
    return head(...rest);
}

require('repl').start({
    eval: (cmd, context, filename, callback) => callback(null, evaluate(read(cmd), env)),
    writer: write
});
