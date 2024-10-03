import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js'


export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    },
    {
        languageOptions:
            { globals: globals.browser },
    },
    {
        ignores: [
            'node_modules/',
            'dist/',
        ],
    },
    {
        plugins: {
            '@stylistic/js': stylisticJs,
        },
    },
    pluginReact.configs.flat.recommended,
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'always-multiline'],
            'object-curly-spacing': ['error', 'always'],
            'no-console': 'warn',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
    },
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];