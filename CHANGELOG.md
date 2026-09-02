# Changelog

All notable changes to the React Hooks Snippets extension.

## [3.1.4] — 2026-09-02

- Added explicit MIT license, support links, and editor-specific discovery
  metadata to the extension manifest
- Restored compatibility with VS Code 1.25 and later
- Refreshed the README with registry-specific install counts, a
  registry-neutral release badge, and a Spectra Assure security assessment
- Renamed `LICENSE.txt` to `LICENSE`

## [3.1.3] — 2026-08-16

- First release on [Open VSX](https://open-vsx.org/extension/AlDuncanson/react-hooks-snippets)
  for VSCodium, Gitpod, and other non-Microsoft editors
- Documented Neovim support — the snippets load directly via LuaSnip's
  `from_vscode` loader
- Optimized the extension package: 106 KB → 13 KB (resized and quantized the
  icon, dropped repo files that don't belong in the package)
- Packaged `.vsix` files are now attached to GitHub releases for manual and
  offline installs
- Per-editor install docs in the README

## [3.1.2] — 2026-08-16

- Now published to [Open VSX](https://open-vsx.org/) for VSCodium, Gitpod,
  and other non-Microsoft editors
- Added this changelog
- Maintenance automation: a monthly watchdog opens an issue if the snippets
  drift from the hooks documented on react.dev, and CI now validates snippet
  structure and README consistency

## [3.1.1] — 2026-08-16

- Refreshed README: intro, snippet tables grouped by react.dev category with
  expansion previews and doc links, new badges, and a demo GIF
- CI: bumped `actions/checkout` to v5; releases are now created automatically
  when a version is published

## [3.1.0] — 2026-08-16

- Added `ueeh` snippet for `useEffectEvent` (stable as of React 19.2)
- Replaced retired shields.io marketplace badges with vsmarketplacebadges.dev

## [3.0.0] — 2025-12-22

- Added `uuh` snippet for the `use` API
- Added CI and publish workflows — releases are now published to the
  Marketplace automatically from version tags

## [2.0.0] — 2025-02-16

- Added snippets for the React 19 hooks: `useActionState`, `useOptimistic`,
  `useFormStatus`, `useTransition`, `useDeferredValue`, `useId`,
  `useSyncExternalStore`, `useInsertionEffect`, and more
- Removed outdated and unrelated snippets (including the redux snippets)
- From this release forward the extension tracks the hooks documented by
  React and React DOM

## [1.3.0] — 2025-02-15

- Removed `cleanUp =` from the `ueh` (useEffect) snippet body
  (thanks @keemor)

## [1.2.0] — 2020-10-21

- Fixed the `urdh` (useReducer) snippet
- Removed the broken `prev` snippet

Earlier releases predate this changelog — see the
[git history](https://github.com/alDuncanson/react-hooks-snippets/commits/master).
