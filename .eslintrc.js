module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime"
    ],
    // https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-uses-vars": "error",
        "react/jsx-uses-react": "error",
        // Disable prop-type validation
        "react/prop-types": "off",
        // "no-undef": 0,
        // "no-unused-vars": 0,
    }
};
