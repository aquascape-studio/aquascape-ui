# @aquascape/ui

Shared React primitives for aquascape-studio — ink-green design system.

Works on React DOM (web) and React Native (mobile) through isomorphic
primitives. Same API, different render targets.

## Exports

```ts
import { Button, Card, Heading, Prose } from "@aquascape/ui/primitives";
import { PlantChip } from "@aquascape/ui/patterns";
import { tokens, ThemeProvider } from "@aquascape/ui/theme";
```

## Local dev

```bash
pnpm install
pnpm typecheck
pnpm build
```

## CI

Runs on every PR: typecheck + build (see `.github/workflows/ci.yml`).

## Owner

app-agent owns primitives & patterns. Theme tokens are governed by the
`ink-green-design-system` skill — all changes should update the skill in
the orchestrator plugin too.
