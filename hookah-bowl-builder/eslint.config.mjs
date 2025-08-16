import js from '@eslint/js'
import next from '@next/eslint-plugin-next'
import globals from 'globals'
import react from 'eslint-plugin-react'

export default [
  {
    ignores: ['**/node_modules/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
    },
    extends: [
      js.configs.recommended,
      next.configs.recommended,
      next.configs['core-web-vitals'],
    ],
    rules: {
      'func-style': ['error', 'expression'],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
    },
  },
]
