const chalk = require('chalk');
const emoji = require('node-emoji');
const { parse: parsePackageJson } = require('./files/package-json');
const { parse: parsePackageLock } = require('./files/package-lock');

function verify(version) {
    try {
        const expectedVersion = version.trim();
        const packageVersion = parsePackageJson();
        const lockVersion = parsePackageLock();

        if (
            packageVersion === expectedVersion &&
            lockVersion === expectedVersion
        ) {
            console.log(`${chalk.green('Yes')}, package version is correct ${emoji.get('ok_hand')}`);
            process.exit(0);
        } else {
            console.error(`${chalk.red('No')}, package version is not correct  ${emoji.get('police_car')}`);
            console.log(`
           expected version: ${chalk.green(expectedVersion)}
       package.json version: ${
                packageVersion === expectedVersion
                    ? chalk.green(packageVersion)
                    : chalk.red(packageVersion)
                }
  package-lock.json version: ${
                lockVersion === expectedVersion
                    ? chalk.green(lockVersion)
                    : chalk.red(lockVersion)
                }
            `);
            process.exit(1);
        }
    } catch (e) {
        console.error(chalk.red('Could not verify version tags\n'), e);
        process.exit(2);
    }
}

module.exports = {
    verify,
};
