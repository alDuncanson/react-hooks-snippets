# React Hooks Snippets

[![CI](https://github.com/alDuncanson/react-hooks-snippets/actions/workflows/ci.yml/badge.svg)](https://github.com/alDuncanson/react-hooks-snippets/actions/workflows/ci.yml) [![Latest release](https://img.shields.io/github/v/release/alDuncanson/react-hooks-snippets?label=latest&color=blue)](https://github.com/alDuncanson/react-hooks-snippets/releases/latest) [![VS Marketplace installs](https://vsmarketplacebadges.dev/installs-short/AlDuncanson.react-hooks-snippets.svg?color=8A2BE2&label=VS%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=AlDuncanson.react-hooks-snippets) [![Open VSX Registry downloads](https://img.shields.io/open-vsx/dt/AlDuncanson/react-hooks-snippets?label=Open%20VSX%20Registry)](https://open-vsx.org/extension/AlDuncanson/react-hooks-snippets) [![Rating](https://vsmarketplacebadges.dev/rating-short/AlDuncanson.react-hooks-snippets.svg?color=yellow)](https://marketplace.visualstudio.com/items?itemName=AlDuncanson.react-hooks-snippets&ssr=false#review-details)

[![Spectra Assure Community Badge](https://secure.software/vscode/badge/alduncanson/react-hooks-snippets)](https://secure.software/vscode/packages/alduncanson/react-hooks-snippets) [![GitHub stars](https://img.shields.io/github/stars/alDuncanson/react-hooks-snippets)](https://github.com/alDuncanson/react-hooks-snippets/stargazers)

React Hooks Snippets gives you a shorthand snippet for every hook in the
[React docs](https://react.dev/reference/react/hooks) — in VS Code, VSCodium,
Cursor, Devin Desktop (formerly Windsurf), and Neovim. Type a short prefix,
press <kbd>Tab</kbd>, and get a fully formed hook call with tab stops on
everything you'd want to edit. It works in JavaScript, TypeScript, and JSX/TSX
files, and covers every current hook — including the newly stable
`useEffectEvent` — plus the `use` API and react-dom's `useFormStatus`.

![Building a search component with three snippets: ush expands to useState, udvh to useDeferredValue, and umh to useMemo](https://raw.githubusercontent.com/alDuncanson/react-hooks-snippets/2586d63/assets/demo.gif)

Prefixes follow one simple pattern: `u` + the hook's initials + `h`. So `ush`
is **u**se**S**tate **h**ook, `ueh` is **u**se**E**ffect **h**ook, and `ucbh`
is **u**se**C**all**b**ack **h**ook:

```js
ush⇥  →  const [count, setCount] = useState(0);
```

## Install

### Visual Studio Marketplace

For VS Code, install from the
[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=AlDuncanson.react-hooks-snippets).
New to extensions? See the
[official VS Code docs](https://code.visualstudio.com/docs/configure/extensions/extensions).

### Open VSX

For VSCodium, Cursor, Devin Desktop (formerly Windsurf), Gitpod, and other
compatible editors, install from
[Open VSX](https://open-vsx.org/extension/AlDuncanson/react-hooks-snippets).

### Neovim

This repo doubles as a
[LuaSnip](https://github.com/L3MON4D3/LuaSnip) snippet source, no port
needed. Add it with your plugin manager and load VS Code-format snippets:

```lua
-- lazy.nvim
{ "alDuncanson/react-hooks-snippets" },
```

```lua
require("luasnip.loaders.from_vscode").lazy_load()
```

Snippets surface through your completion engine
([blink.cmp](https://github.com/Saghen/blink.cmp),
[nvim-cmp](https://github.com/hrsh7th/nvim-cmp)) or a LuaSnip expand keymap.

## Snippets

### State

| Prefix | Hook | Expands to |
|--------|------|------------|
| `ush` | [`useState`](https://react.dev/reference/react/useState) | `const [state, setState] = useState(initialState)` |
| `urdh` | [`useReducer`](https://react.dev/reference/react/useReducer) | `const [state, dispatch] = useReducer(reducer, initialArg, init)` |

### Context

| Prefix | Hook | Expands to |
|--------|------|------------|
| `uch` | [`useContext`](https://react.dev/reference/react/useContext) | `const value = useContext(SomeContext)` |

### Refs

| Prefix | Hook | Expands to |
|--------|------|------------|
| `urh` | [`useRef`](https://react.dev/reference/react/useRef) | `const ref = useRef(initialValue)` |
| `uihh` | [`useImperativeHandle`](https://react.dev/reference/react/useImperativeHandle) | `useImperativeHandle(ref, () => ({ … }), [deps])` |

### Effects

| Prefix | Hook | Expands to |
|--------|------|------------|
| `ueh` | [`useEffect`](https://react.dev/reference/react/useEffect) | `useEffect(() => { … return () => { … } }, [deps])` |
| `uleh` | [`useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect) | `useLayoutEffect(() => { … }, [deps])` |
| `uieh` | [`useInsertionEffect`](https://react.dev/reference/react/useInsertionEffect) | `useInsertionEffect(() => { … }, [deps])` |
| `ueeh` | [`useEffectEvent`](https://react.dev/reference/react/useEffectEvent) | `const onEvent = useEffectEvent(() => { … })` |

### Performance

| Prefix | Hook | Expands to |
|--------|------|------------|
| `umh` | [`useMemo`](https://react.dev/reference/react/useMemo) | `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])` |
| `ucbh` | [`useCallback`](https://react.dev/reference/react/useCallback) | `const memoizedCallback = useCallback(() => { … }, [a, b])` |
| `uth` | [`useTransition`](https://react.dev/reference/react/useTransition) | `const [isPending, startTransition] = useTransition()` |
| `udvh` | [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue) | `const deferredValue = useDeferredValue(value)` |

### Everything else

| Prefix | Hook | Expands to |
|--------|------|------------|
| `uash` | [`useActionState`](https://react.dev/reference/react/useActionState) | `const [state, formAction, isPending] = useActionState(fn, initialState)` |
| `uoh` | [`useOptimistic`](https://react.dev/reference/react/useOptimistic) | `const [optimisticState, addOptimistic] = useOptimistic(state, updateFn)` |
| `usesh` | [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) | `const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` |
| `uidh` | [`useId`](https://react.dev/reference/react/useId) | `const id = useId()` |
| `udbvh` | [`useDebugValue`](https://react.dev/reference/react/useDebugValue) | `useDebugValue(value)` |
| `uuh` | [`use`](https://react.dev/reference/react/use) | `const value = use(resource)` |
| `ufsh` | [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus) | `const { pending, data, method, action } = useFormStatus()` |

## Contributing

Spotted a hook we're missing or a snippet that could be better? Issues and
pull requests are welcome.
