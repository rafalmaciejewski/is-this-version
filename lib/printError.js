const chalk = require('chalk');
const emoji = require('node-emoji');

function printError(expectedVersion, actualVersions) {
    console.error(`${chalk.bold.red('No')}, package version is not correct  ${emoji.get('police_car')}`);
    console.log(`${emoji.get('arrow_right')}${chalk.bold('expected version')}: ${chalk.green(expectedVersion)}`);
    Object.entries(actualVersions).forEach(([file, version]) => {
        const mismatch = version !== expectedVersion;
        console.log(`${
            mismatch
                ? chalk.red(emoji.get('heavy_multiplication_x'))
                : chalk.green(emoji.get('heavy_check_mark'))
        }${file}: ${
            version === expectedVersion
                ? `${chalk.green(version)} `
                : chalk.red(version)
        }`);
    });
}

module.exports = {
    printError,
};
