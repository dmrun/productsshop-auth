module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    plugins: ['prettier'],
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
    },
};
