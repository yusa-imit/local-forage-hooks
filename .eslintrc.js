module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom", "eslint:recommended","prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  overriders: [{
    files: ["*.ts", "*.tsx"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: ["./packages/**/tsconfig.json", "./apps/**/tsconfig.json"],
    },
    settings: { react: { version: "18" } },
    extends: [
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "standard-with-typescript",
      "prettier",
    ],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/method-signature-style": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["*.test.ts", "*.test.js"],
    extends: ["plugin:jest/recommended"],
    env: { jest: true },
  },
  {
    files: ["docs/**"],
    plugins: ["@docusaurus"],
    extends: ["plugin:@docusaurus/recommended"],
  },
  {
    // TODO: Expand to all packages
    files: ["packages/{core,sveltekit}/*.ts"],
    plugins: ["jsdoc"],
    extends: ["plugin:jsdoc/recommended"],
    rules: {
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/require-jsdoc": [
        "warn",
        { publicOnly: true, enableFixer: false },
      ],
      "jsdoc/no-multi-asterisks": ["warn", { allowWhitespace: true }],
      "jsdoc/tag-lines": "off",
    },
  },],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    ecmaFeatures: { jsx: true },
  },
};
