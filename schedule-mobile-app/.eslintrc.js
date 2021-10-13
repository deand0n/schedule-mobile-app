module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "standard"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "no-var": "error",
    "prefer-const": ["error"],
    "spaced-comment": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "arrow-parens": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "comma-dangle": ["error", "never"],
    "max-len": ["error", { code: 120 }],
    "quotes": ["error", "double"],
    "quote-props": ["error", "consistent-as-needed"],
    "no-invalid-this": "error",
    "no-unneeded-ternary": "error",
    "no-useless-constructor": "off",
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", "never"]
  }
};
