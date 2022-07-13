module.exports = {
  "prettier/prettier": [
    "error",
    {
      singleQuote: true,
      parser: "flow",
    },
  ],
  root: true,
  env: {
    node: true,
  },

  extends: [
    // "prettier",
    // "plugin:vue/essential",
    "@vue/standard",
    "plugin:prettier/recommended",
  ],

  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    ecmaVersion: 7,
    sourceType: "module",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": "error",
    // "space-before-function-paren": [
    //   "error",
    //   {
    //     anonymous: "always",
    //     named: "always",
    //     asyncArrow: "always",
    //   },
    // ],
  },
};
