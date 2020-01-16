const chalk = require('chalk');
const emoji = require('node-emoji');
const { getVersions } = require('./getVersions');
const { printError } = require('./printError');

function verify(version) {
    try {
        const expectedVersion = version.trim();
        const versionsByFile = getVersions();
        const versions = Object.values(versionsByFile);
        let mismatch = !!versions.find(version => version !== expectedVersion);
        if (mismatch) {
            printError(expectedVersion, versionsByFile);
            process.exit(1);
        } else {
            console.log(`${chalk.green('Yes')}, package version is correct ${emoji.get('ok_hand')}`);
            process.exit(0);
        }
    } catch (e) {
        console.error(chalk.red('Could not verify version tags\n'), e);
        process.exit(2);
    }
}

module.exports = {
    verify,
};
