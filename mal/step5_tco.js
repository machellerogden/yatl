#!/usr/bin/env node

const { inspect } = require('util');

const read = JSON.parse;
const write = JSON.stringify;

const print = v => console.log(v);
const pprint = v => console.log(inspect(v, { depth: null, colors: true }));

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
    throw: e => { throw e },
    print,
    pprint
};

function resolve(ast, scope, expressions) {
    if (expressions) {
        scope = Object.create(scope);
        ast.some((a, i) => a === '&' ? scope[ast[i + 1]] = expressions.slice(i)
                                     : (scope[a] = expressions[i], 0));
        return scope;
    }

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
    while (true) {
        if (!Array.isArray(ast)) {
            return resolve(ast, scope);
        }

        if (ast[0] === 'def') {
            return scope[ast[1]] = evaluate(ast[2], scope);
        }

        if (ast[0] === 'fn') {
            const body = ast[2];
            const params = ast[1];
            const fn = (...args) => evaluate(body, resolve(params, scope, args));
            fn.$attributes = {
                body,
                scope,
                params
            };
            return fn;
        }

        if (ast[0] === 'let') {
            scope = ast[1].reduce((acc, v, i, bindings) => {
                if (i % 2) acc[bindings[i - 1]] = evaluate(v, acc);
                return acc;
            }, Object.create(scope));
            ast = ast[2];
            continue;
        }

        if (ast[0] === 'if') {
            ast = evaluate(ast[1], scope)
                ? ast[2]
                : ast[3];
            continue;
        }

        if (ast[0] === 'do') {
            resolve(ast.slice(1, -1), scope);
            ast = ast[ast.length - 1];
            continue;
        }

        const [ head, ...rest ] = resolve(ast, scope);

        if (head.$attributes) {
            ast = head.$attributes.body;
            scope = resolve(head.$attributes.params, head.$attributes.scope, rest);
            continue;
        }

        return head(...rest);
    }
}

require('repl').start({
    eval: (cmd, context, filename, callback) => callback(null, evaluate(read(cmd), env)),
    writer: write
});
