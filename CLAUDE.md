# CLAUDE.md

## What this is

A single-page study progress tracker: React 19 + Vite 8, no router, no backend, no tests.
All state lives in the browser's `localStorage`. Deployed as a static site to GitHub Pages
at https://chaitanya-1204.github.io/Study-Tracker/.

## Commands

```bash
npm run dev       # vite dev server
npm run build     # builds into docs/ (NOT dist/)
npm run preview   # serve the production build locally
```

There is no linter, formatter, or test suite. Don't add one unless asked.

## Deploying

GitHub Pages serves the **`main` branch's `/docs` folder** (no Actions workflow — an earlier
`.github/workflows/deploy.yml` and a `gh-pages` branch approach were both removed).
So `docs/` is committed build output, not ignored:

1. `npm run build`
2. commit the regenerated `docs/` along with the source change
3. push to `main`

`vite.config.js` sets `base: './'` so asset paths work under the `/Study-Tracker/` subpath;
`public/.nojekyll` keeps Pages from eating the hashed `assets/` folder. Don't hand-edit
anything in `docs/` — it is overwritten by the next build.

## Data model

One plain object, persisted whole under the `localStorage` key `studyTracker.v1`:

```js
{ version: 1, topics: [ { id, title, subtopics: [ { id, title, items: [ { id, title, done } ] } ] } ] }
```

Three fixed levels: **topic → subtopic → item**. Items are the only thing with a checked
state; every percentage is derived by counting items, never stored. Ids are `crypto.randomUUID()`.

On first load (or if the stored JSON is missing/corrupt), [storage.js](src/storage.js) falls
back to [seedData.js](src/seedData.js), which ships sample DSA and Machine Learning topics.
Bumping the shape means bumping `STORAGE_KEY` or writing a migration — there is none today.

## Architecture

- [src/useTracker.js](src/useTracker.js) — the whole state layer. Holds `data` in one
  `useState`, persists on every change via `useEffect`, and exposes `addTopic`,
  `addSubtopic`, `addItem`, `toggleItem`, `deleteItem`. Updates are immutable and go
  through the `mapTopic` / `mapSub` helpers. It also exports the `countItems` /
  `countSubtopic` / `countTopic` aggregators used by the UI.
- [src/App.jsx](src/App.jsx) — routing is the URL hash: `#/<topicId>` shows a topic page,
  empty hash shows the topic grid. `readHash` + a `hashchange` listener, nothing more.
- [src/accents.js](src/accents.js) — `accentStyle(index)` returns CSS custom properties
  (`--accent`, `--accent-soft`) picked from a 6-color list by the topic's **position** in
  the array. Accent is passed down as an inline `style` prop and everything below reads
  the variables from CSS. Topic colors therefore shift if topics are reordered.
- [src/components/](src/components/) — presentational only; no component touches storage.
  `TopicSummaryCard` (grid tile) and `TopicPage` (detail view) both render `ProgressRing`;
  `SubtopicAccordion` owns its own open/closed `useState`; `AddInline` is the shared
  button-turns-into-input control (Enter commits, Escape cancels, blur commits);
  `ItemRow` is a checkbox plus delete button.
- [src/styles.css](src/styles.css) — one global stylesheet, plain CSS, no modules or
  Tailwind. Theme tokens are the `:root` custom properties at the top (warm paper
  background, serif headings). Class names are flat and match component names.

## Conventions

- Plain `.jsx`, ES modules, no TypeScript, no semicolons, single quotes, 2-space indent.
- Add new mutations to `useTracker` rather than mutating state in components; keep them
  immutable and keep derived counts derived.
- Keep components small and prop-driven, and add styles to `styles.css` next to the
  related block instead of introducing inline styles (the accent variables are the one
  deliberate exception).
- There is no edit/rename or reorder affordance yet, and only items can be deleted —
  topics and subtopics cannot. That's a gap, not an accident of reading the code.
