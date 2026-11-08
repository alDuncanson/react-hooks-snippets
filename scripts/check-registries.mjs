// Checks that both registries list the version in package.json and that
// Socket scores it clean. Prints a markdown report and exits non-zero on
// findings so the watchdog workflow can open an issue from the output.
import { readFileSync } from 'node:fs'

const { version: expected } = JSON.parse(readFileSync('package.json', 'utf8'))
const ID = 'alduncanson.react-hooks-snippets'

const fetchJson = async (url, init) => {
	const res = await fetch(url, init)
	if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)
	return res.json()
}

const marketplaceVersion = async () => {
	const data = await fetchJson(
		'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json;api-version=7.2-preview.1',
			},
			body: JSON.stringify({
				filters: [{ criteria: [{ filterType: 7, value: 'AlDuncanson.react-hooks-snippets' }] }],
				flags: 1,
			}),
		},
	)
	return data.results[0].extensions[0].versions[0].version
}

const openvsxVersion = async () =>
	(await fetchJson('https://open-vsx.org/api/AlDuncanson/react-hooks-snippets')).version

const socketScore = async (ecosystem, version) => {
	const res = await fetch(
		`https://badge.socket.dev/${ecosystem}/package/${ID}/${version}?platform=universal`,
	)
	return (await res.text()).match(/<title>Socket: ([^<]+)<\/title>/)?.[1] ?? `HTTP ${res.status}`
}

const registries = [
	{
		name: 'VS Marketplace',
		ecosystem: 'vscode',
		url: 'https://marketplace.visualstudio.com/items?itemName=AlDuncanson.react-hooks-snippets',
		version: await marketplaceVersion(),
	},
	{
		name: 'Open VSX',
		ecosystem: 'openvsx',
		url: 'https://open-vsx.org/extension/AlDuncanson/react-hooks-snippets',
		version: await openvsxVersion(),
	},
]

const findings = []
console.log('| Registry | Version | Socket |')
console.log('| --- | --- | --- |')
for (const registry of registries) {
	const score = await socketScore(registry.ecosystem, registry.version)
	const report = `https://socket.dev/${registry.ecosystem}/package/${ID}`
	console.log(`| [${registry.name}](${registry.url}) | ${registry.version} | [${score}](${report}) |`)

	if (registry.version !== expected) {
		findings.push(
			`**${registry.name} lists ${registry.version} but \`package.json\` on master is ${expected}.** ` +
				'If no release is in flight, someone else published under this name — rotate the publishing token.',
		)
	}
	if (/^\d+$/.test(score) && Number(score) < 100) {
		findings.push(`Socket scores ${registry.name} ${registry.version} at **${score}** — see the [Socket report](${report}).`)
	}
}
console.log()

if (findings.length === 0) {
	console.log(`Both registries list ${expected}; Socket scores are clean.`)
	process.exit(0)
}

console.log('### Findings\n')
for (const finding of findings) console.log(`- [ ] ${finding}`)
console.log()
console.log('_Checked against `package.json` on master and [Socket](https://socket.dev/vscode/package/' + ID + ')._')
process.exit(1)
