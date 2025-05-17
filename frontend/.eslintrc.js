module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'no-unsafe-optional-chaining': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'curly': ['error', 'multi-line'],
    'no-unused-vars': 'warn'
  },
  overrides: [{
    files: ['**/*.jsx', '**/*.tsx'],
    rules: {
      'react/prop-types': 'off',
      'jsx-a11y/alt-text': 'error'
    }
  }]
} 