const path = require('path');

function jestConfig(project) {
    process.chdir(path.resolve(__dirname, 'projects', project));
    return {
        name: project,
        testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
        transform: {
            '^.+\\.(ts|js|html)$': 'ts-jest',
        },
        testPathIgnorePatterns: ['demo'],
        coveragePathIgnorePatterns: ['demo'],
        resolver: '@nrwl/jest/plugins/resolver',
        moduleFileExtensions: ['ts', 'js', 'html'],
        coverageReporters: ['text', 'html'],
        collectCoverage: true,
        coverageThreshold: {
            global: {
                branches: 95,
                functions: 95,
                lines: 95,
                statements: 95,
            },
        },
        coverageDirectory: '../../dist/tests/' + project + '/coverage',
        snapshotSerializers: [
            'jest-preset-angular/build/AngularSnapshotSerializer.js',
            'jest-preset-angular/build/HTMLCommentSerializer.js',
        ],
        reporters: ['default'],
        maxConcurrency: Infinity,
    };
}

module.exports = {
    jestConfig,
};
