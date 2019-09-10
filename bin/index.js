#!/usr/bin/env node

const program = require('commander');
const pjson = require('pjson');
const { verify } = require('../lib');

program
    .version(pjson.version)
    .arguments('<cmd>')
    .action(cmd => {
        verify(cmd);
    });

program.parse(process.argv);
