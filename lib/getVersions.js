const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

function getVersionFromFile(filepath) {
    const file = readFileSync(
        filepath,
        'utf-8',
    );
    return JSON.parse(file).version;
}

function getVersions() {
    const result = {};
    ['package.json', 'package-lock.json', 'npm-shrinkwrap.json'].forEach(file => {
        const filepath = join(process.cwd(), file);
        if (existsSync(filepath)) {
            result[file] = getVersionFromFile(filepath);
        }
    });
    return result;
}

module.exports = {
    getVersionFromFile,
    getVersions,
};
