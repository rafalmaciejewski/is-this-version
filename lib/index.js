#!/usr/bin/env node

const program = require('commander');
const pjson = require('pjson');
const { verify } = require('./verify');

program
    .version(pjson.version, '-v, --version')
    .arguments('<cmd>')
    .action(cmd => {
        verify(cmd);
    });

program.parse(process.argv);
