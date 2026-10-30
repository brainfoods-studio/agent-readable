// Agent Rules preset for ESLint flat config with typescript-eslint
// (https://beta.llmgraph.in/agent-readable/). Each rule names the rule page it enforces.
// Needs: eslint, typescript-eslint. The type-checked rules need a tsconfig.json.
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        { selector: "ExportAllDeclaration", message: "AR-02: re-export through an explicit list, not export *." },
        { selector: "ImportExpression[source.type!='Literal']", message: "AR-37: import() with a computed path names no file. Use one literal import() per module." },
        { selector: "CallExpression[callee.name='require'][arguments.0.type!='Literal']", message: "AR-38: require() with a computed path hides which files load." },
        { selector: "NewExpression[callee.name='Proxy']", message: "AR-22: a Proxy answers calls that exist nowhere in the source. Expose explicit methods." },
      ],
      "no-eval": "error", // AR-10
      "no-new-func": "error", // AR-10
      "no-implied-eval": "error", // AR-10
      "@typescript-eslint/no-explicit-any": "error", // AR-11, AR-13, AR-39, AR-40
      "@typescript-eslint/no-unsafe-function-type": "error", // AR-14
      "@typescript-eslint/no-require-imports": "error", // AR-05, AR-38
    },
  },
  {
    // strict tier: needs type information (parserOptions.projectService)
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: { parserOptions: { projectService: true } },
    rules: {
      "@typescript-eslint/switch-exhaustiveness-check": "error", // AR-08
      "@typescript-eslint/no-unsafe-call": "error", // AR-09, AR-12, AR-14
      "@typescript-eslint/no-unsafe-argument": "error", // AR-11, AR-39, AR-40
      "@typescript-eslint/no-unsafe-member-access": "error", // AR-09, AR-22
      "@typescript-eslint/no-unsafe-assignment": "error", // AR-39, AR-40
    },
  },
);
