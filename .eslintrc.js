module.exports = {
  'root': true,
  'env':  {
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/recommended',
    // '@vue/standard',
    '@vue/typescript',
  ],
  'plugins': [
    'html',
  ],
  'rules': {
    'indent':             ['warn', 2],
    'comma-dangle':       ['warn', 'always-multiline'],
    'semi':               ['warn', 'always', { 'omitLastInOneLineBlock': true }],
    'operator-linebreak': ['warn', 'before'],
    'yoda':               ['error', 'always'],
    'no-multi-spaces':    ['warn', { exceptions: { VariableDeclarator: true } }],
    'key-spacing':        ['error', { 'align': { 'beforeColon': false, 'afterColon': true, 'on': 'value' } }],
  },
  'parserOptions': {
    'parser': 'typescript-eslint-parser',
  },
};
