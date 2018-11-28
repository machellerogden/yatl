#!/usr/bin/env node

require('repl').start({
    eval: (cmd, context, filename, callback) => callback(null, cmd)
});
