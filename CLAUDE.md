# CLAUDE.md

Context for Claude Code when working in this repository.

## Project

A free, open-source party word game inspired by "Imposter Who?" (iOS). Built so the owner can play with friends without paying for premium content.

### How the game works (basic mode — the only mode for now)

1. Players are set up on a single phone (names or just a count, 3–15 players).
2. The app draws one secret word from the selected categories and one random imposter.
3. The phone is passed from hand to hand: each player taps to see their card.
   - Regular players see the secret word.
   - The imposter only sees "IMPOSTER".
4. Players take turns saying one word related to the secret word. The imposter bluffs.
5. Players discuss and vote; a button reveals who the imposter was and the word.

### Decisions already made

- **Platform:** PWA (web app installable on the phone home screen), works offline. No App Store.
- **Hosting:** GitHub Pages via GitHub Actions (public repo — free). `vite.config.ts` has `base: '/imposter-game/'`.
- **Stack:** React 19 + Vite + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite`).
- **No backend.** Everything runs on the device.
- **Words:** own curated lists (do NOT copy the original app's word lists). Same kind of themes (food, movies, jobs, animals, places…). All categories free — no paywall.
- **Word format:** bilingual JSON, one file per category in `src/data/`:
  ```json
  { "id": "apple", "pt": "Maçã", "en": "Apple" }
  ```
- **i18n:** Portuguese (pt-BR) and English. UI strings via `i18next` (`pt.json` / `en.json`). The owner wants English to practice the language.

## Architecture

```
src/
├── data/      # word lists by category (pt / en)
├── game/      # pure game logic: draw word, draw imposter, avoid repeated words
├── screens/   # Setup, Reveal, Round, Result
├── components/ # shared UI pieces (Button, Logo, Screen, Tag)
└── App.tsx    # controls which screen is shown
```

Keep game logic in `src/game/` pure (no React) so it is easy to test.

### Visual style

Game show / sticker look — avoid generic "AI app" layouts (no plain slate backgrounds, glassmorphism or soft blurred shadows).

- Purple stage background with a sunburst; flat saturated colors (`sun`, `bubble`, `sky`, `mint`, `grape`, `tomato`) defined in `src/index.css` `@theme`.
- Thick ink outline + hard offset shadow (`pop` / `pop-sm` utilities); buttons sink into the shadow when pressed (`press`).
- Fonts: Lilita One for titles (`font-display`), Nunito for body; bundled via `@fontsource` so they work offline.
- Playful motion: card flip, stamp, pop-in, wiggle (respects `prefers-reduced-motion`).

## Conventions

- **Everything in English:** file names, folders, code, commits, branches, PRs.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`…).
- **Commit author:** commit as the owner only. Do NOT add `Co-Authored-By` or other Claude attribution trailers.
- **Branches:** `feat/<short-name>`, `fix/<short-name>`, `chore/<short-name>`.
- The owner already programs; explanations to him should be in Portuguese, simple and concise.

## Roadmap

1. [x] Project setup (React + Vite + TS + Tailwind)
2. [x] GitHub Pages deploy workflow
3. [x] Game logic in `src/game/` (+ tests)
4. [x] Bilingual word lists in `src/data/` (8 categories, ~190 words)
5. [x] Screens: Setup → Reveal (pass the phone) → Round → Result
6. [ ] i18n (pt / en) with language switch — postponed: first release is Portuguese only (UI text hardcoded in pt-BR, words already bilingual)
7. [ ] PWA (manifest, icons, offline)

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
```
