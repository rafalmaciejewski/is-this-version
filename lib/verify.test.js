const { default: mockConsole } = require('jest-mock-console');
const mockProcess = require('jest-mock-process');
const { parse: parsePackageJson } = require('./files/package-json');
const { parse: parsePackageLock } = require('./files/package-lock');
const { verify } = require('./verify');

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
        jest.restoreAllMocks();
        exitMock = mockProcess.mockProcessExit();
        restoreConsole = mockConsole();
    });

    afterEach(() => restoreConsole());

    it('should succeed when versions are matched', async () => {
        parsePackageJson.mockResolvedValue('foo');
        parsePackageLock.mockResolvedValue('foo');
        await verify('foo');
        expect(exitMock).toHaveBeenCalledWith(0);
    });

    it('should fail when package.json version is not matched', async () => {
        parsePackageJson.mockResolvedValue('bar');
        parsePackageLock.mockResolvedValue('foo');
        await verify('foo');
        expect(exitMock).toHaveBeenCalledWith(1);
    });

    it('should fail when package-lock.json version is not matched', async () => {
        parsePackageJson.mockResolvedValue('foo');
        parsePackageLock.mockResolvedValue('bar');
        await verify('foo');
        expect(exitMock).toHaveBeenCalledWith(1);
    });

    it('should fail when failed to parse package.json', async () => {
        parsePackageJson.mockRejectedValue('foo');
        parsePackageLock.mockResolvedValue('foo');
        await verify('foo');
        expect(exitMock).toHaveBeenCalledWith(2);
    });

    it('should fail when failed to parse package-lock.json', async () => {
        parsePackageJson.mockResolvedValue('foo');
        parsePackageLock.mockRejectedValue('foo');
        await verify('foo');
        expect(exitMock).toHaveBeenCalledWith(2);
    });
});
