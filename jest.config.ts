import { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'node',
}

export default config;

// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
// };
