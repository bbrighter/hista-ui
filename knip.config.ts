import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    'src/__tests__/__mocks__/authStoreMock.ts',
    'src/__tests__/__mocks__/errorStoreMock.ts',
    'src/api/generatedApi.ts',
    './setupTest.ts',
  ],
  ignoreDependencies: [
    '@types/babel__generator', // Needed for @stylistic/eslint
    '@types/babel__template',// Needed for @stylistic/eslint
    '@types/babel__traverse',// Needed for @stylistic/eslint
  ],

};

export default config;