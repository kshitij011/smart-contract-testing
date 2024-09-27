import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin';

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic
    }
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      '@stylistic/indent': ['warn', 4, {"ignoreComments": true}],
      // adding semicolon always or never
      "semi": [
        "warn",
        "always"
      ]
    }
  }
];