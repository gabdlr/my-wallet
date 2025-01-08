import path from 'node:path';
import { fileURLToPath } from 'node:url';
import eslint from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import * as tseslint from 'typescript-eslint';
import * as angular from 'angular-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...tseslint.config(
    {
      files: ['**/*.ts'],
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
        ...angular.configs.tsRecommended,
      ],
      processor: angular.processInlineTemplates,
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
      },
    },
    {
      files: ['**/*.html'],
      extends: [
        ...angular.configs.templateRecommended,
        ...angular.configs.templateAccessibility,
      ],
      rules: {},
    }
  ),
  ...compat.extends('plugin:prettier/recommended').map(config => ({
    ...config,
    files: ['**/*.ts'],
  })),
  ...compat
    .extends('plugin:@angular-eslint/template/recommended')
    .map(config => ({
      ...config,
      files: ['**/*.html'],
    })),
  {
    files: ['**/*.html'],
    rules: {},
  },
  ...compat.extends('plugin:prettier/recommended').map(config => ({
    ...config,
    files: ['**/*.html'],
    ignores: ['**/*inline-template-*.component.html'],
  })),
  {
    files: ['**/*.html'],
    ignores: ['**/*inline-template-*.component.html'],

    rules: {
      'prettier/prettier': [
        'error',
        {
          parser: 'angular',
        },
      ],
    },
  },
];
