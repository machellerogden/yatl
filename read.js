#!/usr/bin/env node
'use strict';

module.exports = read;

const { EOL } = require('os');

const isDefined = v => v != null;
const isAlpha = v => isDefined(v) && /[a-z]/i.test(v);
const isSingle = v => [ '.', '$' ].includes(v);
const isString = v => isDefined(v) && /[a-z\?!\-\/"\.]/i.test(v);
const isStringQuote = v => v === '"';
const isQuote = v => v === '`';
const isUnquote = v => v === '~';
const isNumber = v => isDefined(v) && /[0-9]/i.test(v);
const isListStart = v => [ '(', '[' ].includes(v);
const isListEnd = v => [ ')', ']' ].includes(v);
const isWhitespace = v => /[\s\,]/.test(v);
const isComment = v => v === ';';
const isEOL = v => v === EOL;

function read(input) {

    const chars = input.split('');

    const result = [];

    let i = 0;
    const drop = () => chars.splice(i, 1);
    const next = () => i++;
    const stack = [ result ];
    const current = () => stack[stack.length - 1];
    const add = (v) => (current().push(v), v);
    const enter = (v) => (next(), stack.push(add(v)), v);
    const exit = () => (next(), stack.pop());

    const exitQuote = () => current().$quoted && stack.pop();
    const exitUnquote = () => current().$unquoted && stack.pop();

    while (i < chars.length) {

        if (isListStart(chars[i])) {
            enter([]);
            continue;
        }

        if (isListEnd(chars[i])) {
            exit();
            exitQuote();
            exitUnquote();
            continue;
        }

        if (isQuote(chars[i])) {
            enter([ '`' ]);
            current().$quoted = true;
            continue;
        }

        if (isUnquote(chars[i])) {
            enter([ '~' ]);
            current().$unquoted = true;
            continue;
        }

        if (isSingle(chars[i])) {
            add(chars[next()]);
            continue;
        }

        if (isWhitespace(chars[i])) {
            drop();
            continue;
        }

        if (isNumber(chars[i])) {
            let value = '';
            while (isNumber(chars[i])) value += chars[next()];
            add(+value);
            continue;
        }

        if (isStringQuote(chars[i])) {
            let value = '';
            next();
            while (!isStringQuote(chars[i])) value += chars[next()];
            next();
            value = `"${value}"`;
            add(value);
            continue;
        }

        if (isComment(chars[i])) {
            drop();
            while (!isEOL(chars[i])) drop();
            drop();
            continue;
        }

        if (isAlpha(chars[i])) {
            let value = '';
            while (isString(chars[i]) || isNumber(chars[i])) value += chars[next()];
            if (value === 'true') {
                add(true);
            } else if (value === 'false') {
                add(false);
            } else {
                add(value);
            }
            exitQuote();
            exitUnquote();
            continue;
        }

        add(chars[next()]);
    }

    return [ 'do', ...result ];
}
