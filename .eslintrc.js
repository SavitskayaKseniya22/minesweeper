module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'airbnb-typescript', "prettier"],

    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: '../minesweeper/tsconfig.json'
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
    },

};
