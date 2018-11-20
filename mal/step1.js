#!/usr/bin/env node

const read = JSON.parse;
const write = JSON.stringify;

require('repl').start({
    eval: (cmd, context, filename, callback) => callback(null, read(cmd)),
    writer: write
});
