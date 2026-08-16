// Compares the hooks documented on react.dev against snippets.json.
// Prints a markdown report and exits non-zero on drift so the
// watchdog workflow can open an issue from the output.
import { readFileSync } from 'node:fs'

const SIDEBAR_URL =
	'https://raw.githubusercontent.com/reactjs/react.dev/main/src/sidebarReference.json'
const HOOK_PATH = /^\/reference\/react(-dom\/hooks)?\/use($|[A-Z])/

const snippets = JSON.parse(readFileSync('snippets/snippets.json', 'utf8'))
const covered = new Set(Object.keys(snippets))

const res = await fetch(SIDEBAR_URL)
if (!res.ok) throw new Error(`Failed to fetch docs sidebar: HTTP ${res.status}`)

const documented = new Set()
const walk = (node) => {
	if (HOOK_PATH.test(node.path ?? '')) documented.add(node.title)
	for (const child of node.routes ?? []) walk(child)
}
walk(await res.json())

const missing = [...documented].filter((hook) => !covered.has(hook)).sort()
const retired = [...covered].filter((hook) => !documented.has(hook)).sort()

if (missing.length === 0 && retired.length === 0) {
	console.log(`All ${documented.size} documented hooks have snippets.`)
	process.exit(0)
}

if (missing.length > 0) {
	console.log('### Missing snippets\n')
	console.log('Documented on react.dev but not in `snippets/snippets.json`:\n')
	for (const hook of missing) {
		console.log(`- [ ] [\`${hook}\`](https://react.dev/reference/react/${hook})`)
	}
	console.log()
}

if (retired.length > 0) {
	console.log('### Possibly retired\n')
	console.log('In `snippets/snippets.json` but no longer documented on react.dev:\n')
	for (const hook of retired) console.log(`- [ ] \`${hook}\``)
	console.log()
}

console.log(`_Compared against the [react.dev sidebar](${SIDEBAR_URL})._`)
process.exit(1)
