const { readFileSync } = require('fs');
const { join } = require('path');

function parse() {
    const file = readFileSync(
        join(process.cwd(), 'package-lock.json'),
        'utf-8',
    );
    return JSON.parse(file).version;
}

module.exports = {
    parse,
};
