#!/usr/bin/env node

const read = JSON.parse;
const write = JSON.stringify;

const env = {
    '+': (a, b) => a + b
};

function evaluate(ast, scope) {
    const [ head, ...rest ] = ast;
    return scope[head](...rest);
}

require('repl').start({
    eval: (cmd, context, filename, callback) => callback(null, evaluate(read(cmd), env)),
    writer: write
});
