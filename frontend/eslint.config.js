import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default [
	js.configs.recommended, // ESLint’s default JavaScript rules
	{
		files: ['**/*.{js,jsx}'],
		ignores: ['dist/', 'node_modules/'],

		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				window: true,
				document: true,
				console: true,
				navigator: true,
			},
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},

		plugins: {
			react,
			'react-hooks': reactHooks,
		},

		settings: {
			react: {
				version: 'detect', // Automatically detects React version
			},
		},

		rules: {
			// React-specific best practices
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,

			// Disable rules that conflict with Prettier
			...prettier.rules,

			// Custom ESLint tweaks for readability
			'react/react-in-jsx-scope': 'off', // Not needed with React 17+
			'react/prop-types': 'off', // Skip prop-types if using TypeScript or not needed
			'react/jsx-uses-react': 'off',
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'no-console': 'off',

			// Code style rules (Prettier handles formatting, these handle logic)
			'indent': ['error', 'tab'], // Tabs for indentation ✅
			'quotes': ['error', 'single'], // Single quotes ✅
			'semi': ['error', 'always'],
			'comma-dangle': ['error', 'only-multiline'],
		},
	},
];