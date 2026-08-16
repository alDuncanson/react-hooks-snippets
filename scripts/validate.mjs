// Validates snippets.json and checks the README snippet tables stay in sync.
import { readFileSync } from 'node:fs'

const errors = []

const snippets = JSON.parse(readFileSync('snippets/snippets.json', 'utf8'))

const seenPrefixes = new Map()
for (const [hook, { prefix, body, description }] of Object.entries(snippets)) {
	if (!/^u[a-z]*h$/.test(prefix ?? '')) {
		errors.push(`${hook}: prefix "${prefix}" doesn't follow the u…h convention`)
	}
	if (seenPrefixes.has(prefix)) {
		errors.push(`${hook}: prefix "${prefix}" already used by ${seenPrefixes.get(prefix)}`)
	}
	seenPrefixes.set(prefix, hook)
	if (!Array.isArray(body) || body.length === 0 || !body.every((line) => typeof line === 'string')) {
		errors.push(`${hook}: body must be a non-empty array of strings`)
	}
	if (typeof description !== 'string' || description.length === 0) {
		errors.push(`${hook}: missing description`)
	}
}

// README table rows look like: | `ush` | [`useState`](https://…) | … |
const readme = readFileSync('README.md', 'utf8')
const rows = [...readme.matchAll(/^\|\s*`([^`]+)`\s*\|\s*\[`([^`]+)`\]/gm)]
const readmePrefixByHook = new Map(rows.map((row) => [row[2], row[1]]))

for (const [hook, { prefix }] of Object.entries(snippets)) {
	const readmePrefix = readmePrefixByHook.get(hook)
	if (readmePrefix === undefined) {
		errors.push(`README: no table row for ${hook}`)
	} else if (readmePrefix !== prefix) {
		errors.push(`README: ${hook} row shows \`${readmePrefix}\` but the snippet prefix is \`${prefix}\``)
	}
}
for (const hook of readmePrefixByHook.keys()) {
	if (!(hook in snippets)) errors.push(`README: table row for ${hook} has no matching snippet`)
}

if (errors.length > 0) {
	console.error(`${errors.length} problem(s) found:`)
	for (const error of errors) console.error(`  - ${error}`)
	process.exit(1)
}
console.log(`${Object.keys(snippets).length} snippets valid; README tables in sync.`)
