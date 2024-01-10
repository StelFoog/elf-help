/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['jest-expect-message'],
	resetMocks: true,
	collectCoverage: true,
	coverageDirectory: 'test/coverage',
	collectCoverageFrom: ['src/**/*.ts'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
		},
	},
};
