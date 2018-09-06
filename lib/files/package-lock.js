const fs = require('fs');
const path = require('path');

function parse() {
    const file = fs.readFileSync(
        path.join(process.cwd(), 'package-lock.json'),
        'utf-8',
    );
    return JSON.parse(file).version;
}

module.exports = {
    parse,
};
