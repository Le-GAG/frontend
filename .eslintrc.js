module.exports = {
  'root':          true,
  'env':           {
    'node': true,
  },

  'extends':       [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/typescript',
  ],

  'plugins':       [ 'html' ],

  'rules':         {
    'indent':            [ 'warn', 2 ],
    'vue/script-indent': [ 'warn', 2, { 'baseIndent': 1 } ],
    'comma-dangle':       [ 'warn', 'always-multiline' ],
    'semi':               [ 'error', 'always', { 'omitLastInOneLineBlock': true } ],
    'operator-linebreak': [ 'warn', 'before' ],
    'yoda':               [ 'warn', 'never' ],
    'key-spacing':        [ 'warn', { 'align': { 'beforeColon': false, 'afterColon': true, 'on': 'value' } } ],
    'no-multi-spaces':    [ 'warn', {
      exceptions: {
        Property:             true,
        VariableDeclarator:   true,
        ImportDeclaration:    true,
        AssignmentExpression: true,
        ClassProperty:        true,
      },
    }],
    'vue/singleline-html-element-content-newline': false,
    'vue/max-attributes-per-line': ['warn', {
      'singleline': 4,
      'multiline': {
        'max': 1,
        'allowFirstLine': true
      }
    }],
  },

  'overrides':         [
    {
      'files': [ '*.vue' ],
      'rules': {
        'indent': 'off'
      }
    }
  ],

  'parserOptions': {
    'parser': '@typescript-eslint/typescript-estree',
  },
};
