# Agent Rules: lint preset for code that coding agents can follow

Lint and type checker settings that keep code readable for coding agents. Each setting enforces a rule from the Agent Rules rulebook: https://beta.llmgraph.in/agent-readable/?ref=gh-preset

Nothing here is new tooling. The preset turns on rules that ruff, pyright, ESLint, typescript-eslint and tsc already have, chosen because each one catches a pattern that hides a call from an agent or a search. Every setting is listed, with the docs it was checked against, on the rule page named next to it.

## Files

| File | Tool | Use |
|---|---|---|
| `preset/ruff.toml` | ruff | Copy the `[lint]` table into your `ruff.toml`, or into `pyproject.toml` as `[tool.ruff.lint]`. |
| `preset/pyrightconfig.json` | pyright | Standard mode for the repo, strict for the paths agents edit (AR-17). Replace `src/core`. |
| `preset/eslint.config.mjs` | ESLint with typescript-eslint | Flat config. The second block needs type information and a `tsconfig.json`. |
| `preset/tsconfig.agent-rules.json` | tsc | `"extends": "./tsconfig.agent-rules.json"` from your `tsconfig.json`. |

## Two tiers

- **Core** is low noise and safe on an existing codebase: star imports, `export *`, computed `import()` and `require()`, `eval` and `exec`, `Proxy`, constant `getattr` and `setattr`, the `global` statement, and the pytest, FastAPI and Django checks.
- **Strict** (`ANN001`, `ANN201`, `ANN401`, the type-checked typescript-eslint rules, and pyright strict) belongs in the paths agents edit. Turn it on one folder at a time.

## What it covers, and what it doesn't

| Rule | Caught by |
|---|---|
| [AR-01](https://beta.llmgraph.in/agent-readable/ar-01/) star imports | ruff `F403`, `F405`; pyright `reportWildcardImportFromLibrary` |
| [AR-02](https://beta.llmgraph.in/agent-readable/ar-02/) barrel re-exports | ESLint `ExportAllDeclaration` selector; ruff `F822` |
| [AR-03](https://beta.llmgraph.in/agent-readable/ar-03/) same-name functions | ruff `F811` |
| [AR-04](https://beta.llmgraph.in/agent-readable/ar-04/) import aliases | ruff `ICN001`, `PLC0414` |
| [AR-07](https://beta.llmgraph.in/agent-readable/ar-07/) string-built calls | ruff `B009`, `B010`; pyright strict unknown-type rules |
| [AR-08](https://beta.llmgraph.in/agent-readable/ar-08/) typed dispatch | pyright `reportMatchNotExhaustive`; typescript-eslint `switch-exhaustiveness-check` |
| [AR-10](https://beta.llmgraph.in/agent-readable/ar-10/) eval and exec | ruff `S102`, `S307`; ESLint `no-eval`, `no-new-func`, `no-implied-eval` |
| [AR-11](https://beta.llmgraph.in/agent-readable/ar-11/), [AR-13](https://beta.llmgraph.in/agent-readable/ar-13/), [AR-14](https://beta.llmgraph.in/agent-readable/ar-14/) `Any` and untyped callbacks | ruff `ANN401`; typescript-eslint `no-explicit-any`, `no-unsafe-function-type`, `no-unsafe-*` |
| [AR-12](https://beta.llmgraph.in/agent-readable/ar-12/) decorator signatures | pyright `reportUntypedFunctionDecorator` |
| [AR-17](https://beta.llmgraph.in/agent-readable/ar-17/) strict checking | pyright `strict` paths; tsc `strict` |
| [AR-20](https://beta.llmgraph.in/agent-readable/ar-20/) registry ownership | ruff `PLW0603` |
| [AR-22](https://beta.llmgraph.in/agent-readable/ar-22/) proxies | ESLint `NewExpression[callee.name='Proxy']` selector |
| [AR-31](https://beta.llmgraph.in/agent-readable/ar-31/) Django signals | ruff `DJ013` |
| [AR-33](https://beta.llmgraph.in/agent-readable/ar-33/) FastAPI | ruff `FAST002` |
| [AR-34](https://beta.llmgraph.in/agent-readable/ar-34/), [AR-35](https://beta.llmgraph.in/agent-readable/ar-35/) pytest | ruff `PT008`, `PT019` |
| [AR-37](https://beta.llmgraph.in/agent-readable/ar-37/) computed `import()` | ESLint `ImportExpression[source.type!='Literal']` selector |
| [AR-38](https://beta.llmgraph.in/agent-readable/ar-38/) computed `require()` | ESLint `CallExpression` selector; typescript-eslint `no-require-imports` |

No linter rule catches a call reached through a name built at runtime (`getattr(obj, f'on_{status}')`), a `@receiver` with no `sender`, or a caller in another module that still passes an old keyword. Those need a caller search that says what it couldn't see. The rule pages say which is which.

Checked on 2026-10-31 with ruff 0.17.3, ESLint 10.14.0 with typescript-eslint, and TypeScript 5.9.3: every code in the core tier fired on a sample file that breaks it.

## Badge

If your repo uses the preset, you can say so:

```markdown
[![Agent Rules](https://img.shields.io/badge/Agent_Rules-lint_preset-2563eb)](https://beta.llmgraph.in/agent-readable/)
```

## Licence

MIT. See `LICENSE`. The rule pages on beta.llmgraph.in stay on that site; this repo holds only the preset.
