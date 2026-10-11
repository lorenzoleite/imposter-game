# Imposter Game

A free party word game to play with friends on a single phone. Everyone gets the same secret word — except the imposter. Pass the phone, give clues, and find the fake.

## Tech stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vitest](https://vitest.dev)

## Project structure

```
src/
├── data/      # word lists by category (pt / en)
├── game/      # pure game logic: word and imposter drawing
├── screens/   # setup, reveal, round and result screens
└── App.tsx    # controls which screen is shown
```

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the dev server             |
| `npm run build`   | Type-check and build for prod    |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint                       |
| `npm test`        | Run unit tests (Vitest)          |

## Deploy

Every push to `main` builds the app and publishes it to GitHub Pages via `.github/workflows/deploy.yml`.

Live at: https://lorenzoleite.github.io/imposter-game/

One-time setup: in the repo, go to **Settings → Pages → Source** and pick **GitHub Actions**.
