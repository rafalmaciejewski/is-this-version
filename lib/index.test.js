const { default: mockConsole } = require('jest-mock-console');
const mockProcess = require('jest-mock-process');
const { parse: parsePackageJson } = require('./files/package-json');
const { parse: parsePackageLock } = require('./files/package-lock');
const { verify } = require('./index');

jest.mock('./files/package-json', () => {
    return {
        parse: jest.fn(),
    };
});
jest.mock('./files/package-lock', () => {
    return {
        parse: jest.fn(),
    };
});

describe('verify', () => {
    let exitMock;
    let restoreConsole;

    beforeEach(() => {
        exitMock = mockProcess.mockProcessExit();
        restoreConsole = mockConsole();
    });

    afterEach(() => {
        restoreConsole();
        jest.clearAllMocks();
    });

    it('should succeed when versions are matched', () => {
        parsePackageJson.mockReturnValue('foo');
        parsePackageLock.mockReturnValue('foo');
        verify('foo');
        expect(exitMock).toHaveBeenCalledWith(0);
    });

    it('should fail when package.json version is not matched', () => {
        parsePackageJson.mockReturnValue('bar');
        parsePackageLock.mockReturnValue('foo');
        verify('foo');
        expect(exitMock).toHaveBeenCalledWith(1);
    });

    it('should fail when package-lock.json version is not matched', () => {
        parsePackageJson.mockReturnValue('foo');
        parsePackageLock.mockReturnValue('bar');
        verify('foo');
        expect(exitMock).toHaveBeenCalledWith(1);
    });

    it('should fail when failed to parse package.json', () => {
        parsePackageJson.mockImplementation(() => {
            throw new Error();
        });
        parsePackageLock.mockReturnValue('foo');
        verify('foo');
        expect(exitMock).toHaveBeenCalledWith(2);
    });

    it('should fail when failed to parse package-lock.json', () => {
        parsePackageJson.mockReturnValue('foo');
        parsePackageLock.mockImplementation(() => {
            throw new Error();
        });
        verify('foo');
        expect(exitMock).toHaveBeenCalledWith(2);
    });
});
