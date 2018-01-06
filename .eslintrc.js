module.exports = {
  env: {
    browser:   true,
  },
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  globals: {
    process: false,
  }
};
