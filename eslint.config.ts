import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*']
  },
  skipFormatting,

  {
    rules: {
      'vue/script-indent': ['error', 4, { 'baseIndent': 1 }],
      'vue/html-self-closing': [
        'error', {
          html: {
            component: 'always',
            normal: 'never',
            void: 'never'
          },
          math: 'always',
          svg: 'always'
        }
      ],
      'vue/html-indent': ['error', 4, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 1 },
        multiline: { max: 1 }
      }],
      'vue/first-attribute-linebreak': [
        'error', {
          singleline: 'beside',
          multiline: 'below'
        }
      ],
      'vue/order-in-components': ['error', {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }],
      'vue/no-irregular-whitespace': ['error', {
        skipStrings: true,
        skipComments: false,
        skipRegExps: false,
        skipTemplates: false,
        skipHTMLAttributeValues: false,
        skipHTMLTextContents: false
      }],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/match-component-file-name': ['error', {
        extensions: ['vue'],
        shouldMatchCase: false
      }],
      'vue/no-dupe-keys': ['error', { groups: [] }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: true
      }],
      'comma-dangle': ['error', {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }],
      'linebreak-style': ['error', 'windows'],
      'no-console': 'error',
      'no-debugger': 'error',
      'arrow-parens': ['error', 'always'],
      'no-plusplus': 'off',
      'constructor-super': 'off',
      'no-mixed-operators': ['error', {
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ],
        allowSamePrecedence: true
      }],
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'no-unused-expressions': 'error',
      'no-param-reassign': 'off',
      'prefer-destructuring': ['error', {
        array: true,
        object: true
      }, {
        enforceForRenamedProperties: false
      }],
      'no-bitwise': ['error', { allow: ['~'] }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'max-len': ['error', { code: 120 }],
      'object-curly-newline': ['error', {
        ObjectExpression: { multiline: true, consistent: true },
        ObjectPattern: { multiline: true, consistent: true }
      }],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    }
  }
);
