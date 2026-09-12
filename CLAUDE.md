# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build (Vercel adapter)
- `npm run preview` — preview the production build
- `npm run check` — sync SvelteKit types and run `svelte-check`
- `npm run check:watch` — same, in watch mode
- `npm run format` — Prettier write
- `npm run lint` — Prettier check + ESLint

There is no test framework configured in this repo (no Vitest/Playwright/Jest).

## Architecture

SvelteKit (Svelte 5) site deployed via `@sveltejs/adapter-vercel`, styled with Tailwind CSS v4, personal site/portfolio ("growing garden") with a homepage tile grid, an articles/blog section, and a set of standalone experiment routes.

### Articles pipeline (two parallel loading paths)

Articles are markdown files in `src/articles/*.md` with frontmatter (`title`, `description`, `categories`, `published`, `created`, `updated`), compiled via `mdsvex` (configured in `svelte.config.js`) so each `.md` file is importable as a Svelte component with a `metadata` export (typed in `src/mdsvex.d.ts`).

There are two independent ways articles get loaded, which must be kept in sync when changing the frontmatter shape:

1. **List view**: `src/routes/api/articles/+server.ts` uses `import.meta.glob('/src/articles/*.md', { eager: true })` to build the list from metadata only, caches the result in a module-level `articles` variable, and filters to `published: true`. `src/routes/articles/+page.ts` fetches this `/api/articles` endpoint and revives `Date` fields from the JSON response.
2. **Detail view**: `src/routes/articles/[slug]/+page.ts` dynamically `import()`s the single matching `.md` file directly (not via the API), and 404s if the post isn't `published`.

`Article`/category types live in `src/lib/types.ts`; `$lib` is the alias for `src/lib`.

### Homepage tiles

The homepage (`src/routes/+page.svelte`) is a grid of `Tile.svelte` cards, each populated by a component in `src/components/tiles/` (`AboutMe`, `AboutApp`, `EmployMe`, `Experiments`, `MostRecentPosts`). `+page.ts` sets `csr = dev` and `prerender = true` so the homepage ships as a static asset in production and only gets CSR/HMR during development.

Note: components in this codebase mix Svelte 4 (`export let`) and Svelte 5 (`$props()`) prop syntax — check the sibling file's style before assuming which one a given component/route uses.

### Experiments routes

`src/routes/experiments/*` are self-contained playground pages, each with its own local modules rather than shared abstractions:

- `hex-grid-canvas/` — canvas-based hex grid with its own `Grid.ts`, `Hex.model.ts`, and `coordinates.utils.ts`.
- `wasm-rust/` — loads a prebuilt wasm-bindgen package that was manually copied into `pkg/`. The project has `vite-plugin-wasm` as a dependency, but this experiment does not go through the Vite/SvelteKit wasm build pipeline — it imports the prebuilt JS glue directly.

### Code style

Enforced by Prettier (`.prettierrc`) + ESLint flat config (`eslint.config.js`): tabs, single quotes, no semicolons, no trailing commas, 100-char print width. ESLint config layers `typescript-eslint` recommended rules and `eslint-plugin-svelte` recommended rules, with Prettier conflicts turned off.
