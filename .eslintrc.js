module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'react'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'import/no-named-as-default': 'off',
        'import/no-unresolved': ['error', {ignore: ['^@']}],
        'import/named': 'off',
        'import/newline-after-import': 'error',
        'import/exports-last': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'import/no-nodejs-modules': ['error', {allow: ['react']}],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'index',
              'sibling',
              'parent',
            ],
          },
        ],
        'linebreak-style': 1,
        'no-console': 'warn',
        'no-unexpected-multiline': 'error',
        'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {argsIgnorePattern: '^_'},
        ],
        'react/jsx-no-target-blank': 'off',
        semi: 'error',
        curly: 'off',
        'no-duplicate-imports': 'error',
        'no-dupe-else-if': 'warn',
        'no-class-assign': 'off',
        'no-useless-escape': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': 'error',
        'no-trailing-spaces': 'error',
        'no-dupe-keys': 'error',
        'no-return-assign': 'error',
        'no-underscore-dangle': [
          'error',
          {
            allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', '_retry', '_id'],
          },
        ],
        quotes: ['error', 'single'],
        'semi-style': ['error', 'last'],
        'eol-last': ['error', 'always'],
        'max-len': [
          'error',
          {
            code: 120,
          },
        ],
        indent: [
          'error',
          2,
          {
            MemberExpression: 1,
            SwitchCase: 1,
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            FunctionDeclaration: {
              body: 1,
              parameters: 2,
            },
            FunctionExpression: {
              body: 1,
              parameters: 2,
            },
            CallExpression: {
              arguments: 1,
            },
          },
        ],
        'no-empty': [
          'error',
          {
            allowEmptyCatch: true,
          },
        ],
        'react/prop-types': 0,
        'react/require-default-props': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'react/display-name': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-indent': ['error', 2],
        'react/jsx-indent-props': ['error', 2],
        'react/jsx-filename-extension': [
          1,
          {
            extensions: ['.js', '.jsx', '.tsx'],
          },
        ],
        'react/jsx-props-no-spreading': [
          1,
          {
            custom: 'ignore',
          },
        ],
        'react/jsx-tag-spacing': [
          'error',
          {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never',
          },
        ],
        'react/jsx-space-before-closing': ['off', 'always'],
        'react/jsx-child-element-spacing': 'off',
        'react/jsx-curly-spacing': [
          'error',
          'never',
          {
            allowMultiline: true,
          },
        ],
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          node: {
            paths: ['./src'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
          typescript: {},
        },
      },
    },
  ],
};
