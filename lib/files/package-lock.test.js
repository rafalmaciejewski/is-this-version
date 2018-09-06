const { readFileSync } = require('fs');
const { parse } = require('./package-lock');

jest.mock('fs', () => {
    return {
        readFileSync: jest.fn(),
    };
});

describe('package-lock parser', () => {
    beforeEach(jest.restoreAllMocks);

    it('should parse version', () => {
        readFileSync.mockReturnValue('{"version":"foo"}');
        expect(parse()).toEqual('foo');
    });

    it('should throw an error when failed to parse', () => {
        readFileSync.mockReturnValue('invalid json');
        expect(() => parse()).toThrowError();
    });
});
