// Writes the README badges as SVGs: node scripts/badges.mjs <out-dir>
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { badge } from './badge.mjs'

const [outDir = 'badges'] = process.argv.slice(2)
const github = {
	Accept: 'application/vnd.github+json',
	...(process.env.GH_TOKEN ? { Authorization: `Bearer ${process.env.GH_TOKEN}` } : {}),
}

const json = async (url, init) => {
	const res = await fetch(url, init)
	if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)
	return res.json()
}

const short = (n) => {
	for (const [div, suffix] of [[1e9, 'B'], [1e6, 'M'], [1e3, 'K']]) {
		if (n >= div) return (n / div).toFixed(2).replace(/\.?0+$/, '') + suffix
	}
	return String(Math.trunc(n))
}

const gallery = await json('https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json', Accept: 'application/json;api-version=7.2-preview.1' },
	body: JSON.stringify({
		filters: [{ criteria: [{ filterType: 7, value: 'AlDuncanson.react-hooks-snippets' }] }],
		flags: 256,
	}),
})
const stats = Object.fromEntries(
	gallery.results[0].extensions[0].statistics.map(({ statisticName, value }) => [statisticName, value]),
)
const openvsx = await json('https://open-vsx.org/api/AlDuncanson/react-hooks-snippets')
const repo = await json('https://api.github.com/repos/alDuncanson/react-hooks-snippets', { headers: github })
const release = await json('https://api.github.com/repos/alDuncanson/react-hooks-snippets/releases/latest', {
	headers: github,
})

const rating = Number((stats.averagerating ?? 0).toFixed(1))
const badges = {
	latest: badge('latest', release.tag_name, 'blue'),
	installs: badge('VS Marketplace', short(stats.install), 'blueviolet'),
	rating: badge('rating', `${rating}/5 (${stats.ratingcount ?? 0})`, 'yellow'),
	openvsx: badge('Open VSX Registry', short(openvsx.downloadCount), 'green'),
	stars: badge('stars', String(repo.stargazers_count), 'lightgrey'),
}

mkdirSync(outDir, { recursive: true })
for (const [name, svg] of Object.entries(badges)) writeFileSync(join(outDir, `${name}.svg`), svg)
console.log(`wrote ${Object.keys(badges).join(', ')} to ${outDir}`)
