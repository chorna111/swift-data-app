/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testMatch: ['**/?(*.)+(spec|test).ts'],
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  testTimeout:60000
};