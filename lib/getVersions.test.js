const { readFileSync } = require('fs');
const { getVersionFromFile } = require('./getVersions');

jest.mock('fs', () => {
    return {
        readFileSync: jest.fn(),
    };
});

describe('getVersions', () => {
    describe('getVersionFromFile', () => {
        afterEach(jest.clearAllMocks);

        it('should parse version', () => {
            readFileSync.mockReturnValue('{"version":"foo"}');
            expect(getVersionFromFile()).toEqual('foo');
        });

        it('should throw an error when failed to parse', () => {
            readFileSync.mockReturnValue('invalid json');
            expect(() => getVersionFromFile()).toThrowError();
        });
    });
});
