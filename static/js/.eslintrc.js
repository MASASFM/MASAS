module.exports = {
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    
    "installedESLint": true,
    
    "plugins": [
        "standard",
        "promise",
        "react"
    ],

    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true,
        }
    },

    "env": {
        "browser": true,
    },

    "globals": {
        "$": true,
        "paper": true,
        "require": true,
        "module": true,
        "Promise": true,
    },

    // react: https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js
    "rules": {
    	"indent": ["error", "tab", { "SwitchCase": 1 }],
    	"react/display-name": 0,
    },
};