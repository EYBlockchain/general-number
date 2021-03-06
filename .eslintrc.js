module.exports = {
  extends: [require.resolve('eslint-config-codfish')].filter(Boolean),
  rules: {
    "no-underscore-dangle": "off",
    'no-console': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'babel/no-unused-expressions': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off'
  },
  globals: {
    'BigInt': 'true'
  },
  env: {
    mocha: true
  },
};
