# aquascape-ui

**Owner**: app-agent  
**Publishes**: `@aquascape/ui` → GitHub Packages  
**Stack**: TypeScript + react-native-unistyles (shared web + RN)

## Layout

```
aquascape-ui/
├── primitives/      # Button, Text, Input, Card, Sheet, Toast
├── patterns/        # TankCard, SpeciesChip, PARMeter, CO2Gauge
├── index.ts
├── dist/
├── package.json
└── tsconfig.json
```

## Path note

Agent definitions reference `packages/ui/` — the actual root is `aquascape-ui/`. All tokens and components live here.

## Key commands

```bash
pnpm build
pnpm typecheck
pnpm test
```

## Design system

Ink-green tokens (see `ink-green-design-system` skill). No inline hex values — tokens only.  
One component per primitive — no `<ButtonWeb>` + `<ButtonMobile>` splits.
