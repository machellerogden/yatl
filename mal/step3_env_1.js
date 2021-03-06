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
    '%': (a, b) => a % b,
    throw: e => { throw e }
};

function resolve(ast, scope) {
    if (Array.isArray(ast)) {
        return ast.map(el => evaluate(el, scope));
    }

    if (typeof ast !== 'string') {
        return ast;
    }

    if (ast in scope) {
        return scope[ast];
    }

    scope.throw(new Error(`${ast} is undefined`));
}

function evaluate(ast, scope) {
    if (!Array.isArray(ast)) {
        return resolve(ast, scope);
    }

    if (ast[0] === 'def') {
        return scope[ast[1]] = evaluate(ast[2], scope);
    }

    const [ head, ...rest ] = resolve(ast, scope);
    return head(...rest);
}

require('repl').start({
    eval: (cmd, context, filename, callback) => callback(null, evaluate(read(cmd), env)),
    writer: write
});
