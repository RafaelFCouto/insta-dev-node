module.exports = {
    env: {
      node: true,
      es2021: true
    },
    extends: [
      'airbnb-base',
      '@eslint/js/recommended'  // Certifique-se de instalar e configurar este plugin corretamente
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module'  // Se você estiver usando ESModules
    },
    rules: {
      'no-param-reassign': 'off',
      'camelcase': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }]
    }
  };
  