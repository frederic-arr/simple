module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    {
      files: ['*.spec.ts', '*.e2e-spec.ts'],
      rules: {
        'init-declarations': 'off',
        'max-nested-callbacks': ['error', 4],
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
  ],
  rules: {
    /**
     * ESLint
     */
    /// Possible Problems
    // ! https://eslint.org/docs/rules/array-callback-return
    // ! https://eslint.org/docs/rules/no-await-in-loop
    'no-constructor-return': 'error',
    'no-duplicate-imports': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-private-class-members': 'error',
    'no-use-before-define': 'error',
    'require-atomic-updates': 'error',
    /// Suggestions
    'accessor-pairs': 'error',
    // ! https://eslint.org/docs/rules/arrow-body-style
    'block-scoped-var': 'error',
    // ! https://eslint.org/docs/rules/camelcase => typescript-eslint already handles this
    // ! https://eslint.org/docs/rules/capitalized-comments
    // ! https://eslint.org/docs/rules/class-methods-use-this
    complexity: ['warn', 20],
    // ! https://eslint.org/docs/rules/consistent-return
    // ! https://eslint.org/docs/rules/consistent-this
    curly: ['error', 'multi'],
    // ! https://eslint.org/docs/rules/default-case
    'default-case-last': 'error',
    'default-param-last': 'error',
    // 'dot-notation': 'error',
    eqeqeq: 'error',
    // ! https://eslint.org/docs/rules/func-name-matching
    'func-names': 'error',
    // ? https://eslint.org/docs/rules/func-style => Can be interesting
    'grouped-accessor-pairs': 'error',
    // ! https://eslint.org/docs/rules/guard-for-in
    // ! https://eslint.org/docs/rules/id-denylist
    'id-length': [
      'warn',
      {
        min: 1,
        max: 40,
        properties: 'never',
      },
    ],
    // ! https://eslint.org/docs/rules/id-match
    'init-declarations': 'error',
    'max-classes-per-file': 'error',
    'max-depth': 'error',
    // ! https://eslint.org/docs/rules/max-lines
    // ? 'max-lines-per-function': 'error',
    'max-nested-callbacks': ['error', 1],
    // ! https://eslint.org/docs/rules/max-params
    // ? https://eslint.org/docs/rules/max-statements
    'multiline-comment-style': ['error', 'starred-block'],
    // ! https://eslint.org/docs/rules/new-cap
    'no-alert': 'error', // * Browser-only
    'no-array-constructor': 'error',
    // ! https://eslint.org/docs/rules/no-bitwise
    'no-caller': 'error',
    'no-console': 'error',
    // ? 'no-confusing-arrow': 'error', // Issues with prettier
    // ! https://eslint.org/docs/rules/no-continue
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-empty-function': [
      'error',
      {
        allow: ['constructors'],
      },
    ],
    // ! https://eslint.org/docs/rules/no-eq-null
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-inline-comments': 'error',
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    // https://eslint.org/docs/rules/no-labels
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': [
      'warn',
      {
        detectObjects: true,
        ignore: [-1, 0, 1, 2],
      },
    ],
    'no-mixed-operators': 'error',
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    // ! https://eslint.org/docs/rules/no-new
    'no-new-func': 'error',
    'no-new-object': 'error',
    // ! https://eslint.org/docs/rules/no-new-wrappers
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    // ! https://eslint.org/docs/rules/no-plusplus
    'no-proto': 'error',
    // ! https://eslint.org/docs/rules/no-restricted-exports
    // ! https://eslint.org/docs/rules/no-restricted-globals
    // ! https://eslint.org/docs/rules/no-restricted-imports
    'no-restricted-imports': [
      'error',
      {
        paths: ['.', '..'],
      },
    ],
    // ! https://eslint.org/docs/rules/no-restricted-properties
    // ! https://eslint.org/docs/rules/no-restricted-syntax
    'no-return-assign': 'error',
    // ! https://eslint.org/docs/rules/no-return-await
    'no-script-url': 'error',
    'no-sequences': 'error',
    // 'no-shadow': 'error', // ! Conflicts with TS
    // ! https://eslint.org/docs/rules/no-ternary
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    // ! https://eslint.org/docs/rules/no-undefined
    // ! https://eslint.org/docs/rules/no-underscore-dangle
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    // ! https://eslint.org/docs/rules/no-useless-constructor
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    // ! https://eslint.org/docs/rules/no-void
    // ? https://eslint.org/docs/rules/no-warning-comments
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'one-var-declaration-per-line': 'error',
    'operator-assignment': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-exponentiation-operator': 'error',
    'prefer-named-capture-group': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    radix: 'error',
    // ! https://eslint.org/docs/rules/require-await
    'require-unicode-regexp': 'error',
    // ? https://eslint.org/docs/rules/sort-imports
    // ! https://eslint.org/docs/rules/sort-keys
    // ! https://eslint.org/docs/rules/sort-vars
    'spaced-comment': 'error',
    // ! https://eslint.org/docs/rules/strict
    'symbol-description': 'error',
    'vars-on-top': 'error',
    yoda: 'error',
    // Layout
    // 'operator-linebreak': ['error', 'before'], // ! Conflicts with Prettier

    /**
     * Typescript
     */
    '@typescript-eslint/array-type': [
      'error',
      {
        // `T[]` instead of `Array<T>`
        default: 'array',
        readonly: 'array',
      },
    ],
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/class-literal-property-style': ['error', 'getters'],
    // `{ [key: string]: unknown }` instead of `Record<string, unknown>`
    '@typescript-eslint/consistent-indexed-object-style': [
      'error',
      'index-signature',
    ],
    // Dissalow `... as T`
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'never',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-exports': 'error',
    // ! https://typescript-eslint.io/rules/consistent-type-imports
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        // Default to strictCamelcase
        selector: 'default',
        format: ['strictCamelCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        // Boolean values should start with a specific verb
        selector: ['variable', 'parameter', 'typeProperty'],
        types: ['boolean'],
        format: ['StrictPascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        // Private members should start with an underscore
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['strictCamelCase'],
        leadingUnderscore: 'require',
        filter: {
          regex: '^onApplicationShutdown$',
          match: false,
        },
      },
      {
        // Boolean values should start with a specific verb
        selector: ['classProperty', 'parameterProperty', 'accessor'],
        modifiers: ['private'],
        types: ['boolean'],
        format: ['StrictPascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        leadingUnderscore: 'require',
      },
      {
        // Boolean values should start with a specific verb
        selector: ['variable'],
        modifiers: ['const', 'global'],
        types: ['boolean'],
        format: ['UPPER_CASE'],
        prefix: ['IS_', 'SHOULD_', 'HAS_', 'CAN_', 'DID_', 'WILL_'],
      },
      {
        // Type-like (Interfaces, Types, Classes, ...) should be in StrictPascalCase
        selector: 'typeLike',
        format: ['StrictPascalCase'],
      },
      {
        // Interfaces should start with I
        selector: 'interface',
        format: ['StrictPascalCase'],
        prefix: ['I'],
      },
      {
        // Types should start with T
        selector: 'typeAlias',
        format: ['StrictPascalCase'],
        prefix: ['T'],
      },
      {
        // If we are directly writing object literal properties, allow everything
        selector: 'objectLiteralProperty',
        format: null,
      },
      {
        // const variables should be in uppercase
        selector: 'variable',
        modifiers: ['const', 'global'],
        format: ['UPPER_CASE'],
      },
      {
        // Ignore if the property requires quotes
        selector: [
          'classProperty',
          'objectLiteralProperty',
          'typeProperty',
          'classMethod',
          'objectLiteralMethod',
          'typeMethod',
          'accessor',
          'enumMember',
        ],
        format: null,
        modifiers: ['requiresQuotes'],
      },
      {
        // Enums
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-extraneous-class': [
      'error',
      {
        allowWithDecorator: true,
      },
    ],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    // ! https://typescript-eslint.io/rules/no-type-alias
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/non-nullable-type-assertion-style': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    // ! https://typescript-eslint.io/rules/prefer-readonly-parameter-types/
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/prefer-return-this-type': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    '@typescript-eslint/sort-type-union-intersection-members': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/typedef': 'error',
    '@typescript-eslint/unified-signatures': 'error',

    /**
     * TSDoc
     */
    'tsdoc/syntax': 'warn',
  },
};
