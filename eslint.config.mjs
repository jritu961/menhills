import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  {
    "env": {
      "browser": true,
      "node": true,
      "es2021": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": ["react", "prettier"],
    "rules": {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "react/prop-types": "off",
      "no-console": "warn"
    }
  },
  
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];