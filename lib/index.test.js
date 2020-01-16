const { default: mockConsole } = require('jest-mock-console');
const mockProcess = require('jest-mock-process');
const { getVersions } = require('./getVersions');
const { verify } = require('./index');

jest.mock('./getVersions', () => {
    return {
        getVersions: jest.fn(),
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
        getVersions.mockReturnValue({
            'file1': 'foo',
            'file2': 'foo',
        });
        verify('foo');
        expect(exitMock).toHaveBeenCalledWith(0);
    });

    it('should trim user input', () => {
        getVersions.mockReturnValue({
            'file1': 'foo',
            'file2': 'foo',
        });
        verify(' foo ');
        expect(exitMock).toHaveBeenCalledWith(0);
    });

    it('should fail when at least one version do not match', () => {
        getVersions.mockReturnValue({
            'file1': 'foo',
            'file2': 'foo',
            'file3': 'bar',
        });
        verify('foo');
        expect(exitMock).toHaveBeenCalledWith(1);
    });

    it('should fail when all versions do not match', () => {
        getVersions.mockReturnValue({
            'file1': 'bar',
            'file2': 'baz',
        });
        verify('foo');
        expect(exitMock).toHaveBeenCalledWith(1);
    });

    it('should fail with `2` exit code when failed to get versions', () => {
        getVersions.mockImplementation(() => {
            throw new Error();
        });
        verify('foo');
        expect(exitMock).toHaveBeenCalledWith(2);
    });
});
