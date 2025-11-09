module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: './tailwind.config.js',
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'tailwindcss',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'warn',
    // Más reglas personalizadas si son necesarias
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js'],
};
