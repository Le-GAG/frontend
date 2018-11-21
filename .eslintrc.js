module.exports = {
  'root':          true,
  'env':           {
    'node': true,
  },
  'extends':       [
    'eslint:recommended',
    'plugin:vue/recommended',
    // '@vue/standard',
    '@vue/typescript',
  ],
  'plugins':       [
    'html',
  ],
  'rules':         {
    'indent':             [ 'warn', 2 ],
    'comma-dangle':       [ 'warn', 'always-multiline' ],
    'semi':               [ 'warn', 'always', { 'omitLastInOneLineBlock': true } ],
    'operator-linebreak': [ 'warn', 'before' ],
    'yoda':               [ 'error', 'always' ],
    'key-spacing':        [ 'error', { 'align': { 'beforeColon': false, 'afterColon': true, 'on': 'value' } } ],
    'no-multi-spaces':    [ 'warn', {
      exceptions: {
        Property:             true,
        VariableDeclarator:   true,
        ImportDeclaration:    true,
        AssignmentExpression: true,
        ClassProperty:        true,
      },
    }],
  },
  'parserOptions': {
    'parser': 'typescript-eslint-parser',
  },
};
