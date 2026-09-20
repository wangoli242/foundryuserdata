# Convention audit

Roots: `scripts startups`

## Summary

| Rule | House form | Conforming | Off-convention | Conformance |
|---|---|---:|---:|---:|
| `module-id-redeclared` | `imported MODULE_ID` | 80 | 0 | 100% |
| `module-id-literal` | `MODULE_ID` | 739 | 0 | 100% |
| `settings-read` | `getModuleSetting(...)` | 404 | 0 | 100% |
| `flag-read` | `getLAFlag / setLAFlag / unsetLAFlag` | 508 | 0 | 100% |
| `helper-as-method` | `free-function call` | 936 | 0 | 100% |
| `binding-in-generated-source` | `interpolated into the generated source` | 167 | 0 | 100% |
| `escape-html` | `escapeHtml` | 15 | 0 | 100% |
| `log-prefix` | `console.* with the module prefix` | 413 | 0 | 100% |
| `token-by-id` | `canvas.tokens.get(id)` | 147 | 0 | 100% |

## Module namespace constant  (`module-id-redeclared`)

One shared export, not a private copy per file: renaming or reusing the id currently means editing every copy.

House form: `imported MODULE_ID` (80 sites). Off-convention: 0.

## Module id spelling  (`module-id-literal`)

The id is a constant, and the literal spelling defeats every find-usages on it.

House form: `MODULE_ID` (739 sites). Off-convention: 0.

## Module setting reads  (`settings-read`)

getModuleSetting centralizes the missing-setting fallback; raw reads throw when a setting is not registered yet.

House form: `getModuleSetting(...)` (404 sites). Off-convention: 0.

## Flag access  (`flag-read`)

The LA flag helpers carry the namespace and the null-safety, so call sites stop deciding about `?.`.

House form: `getLAFlag / setLAFlag / unsetLAFlag` (508 sites). Off-convention: 0.

## Shared helper called as a method  (`helper-as-method`)

These helpers are free functions; a method-style call is always a TypeError at runtime.

House form: `free-function call` (936 sites). Off-convention: 0.

## Module binding used as bare text inside generated source  (`binding-in-generated-source`)

new Function and eval see globals only, so a module import inside generated source is a ReferenceError.

House form: `interpolated into the generated source` (167 sites). Off-convention: 0.

## Local HTML-escape chain instead of the shared helper  (`escape-html`)

string-utils.js exports escapeHtml; hand-rolled chains drift and miss the quote cases.

House form: `escapeHtml` (15 sites). Off-convention: 0.

## Console log prefix  (`log-prefix`)

Most log lines already carry the module prefix, and the unprefixed ones cannot be traced back to this module in a busy console.

House form: `console.* with the module prefix` (413 sites). Off-convention: 0.

## Token lookup by id  (`token-by-id`)

A find-by-id predicate over placeables is a slower hand-rolled canvas.tokens.get.

House form: `canvas.tokens.get(id)` (147 sites). Off-convention: 0.
