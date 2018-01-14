module.exports = {
  parserOptions: {
    parser:      "babel-eslint",
    ecmaVersion: 2017,
    sourceType:  "module",
  },
  env:           {
    browser: true,
  },
  extends:       [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  globals:       {
    process: false,
  },
};
