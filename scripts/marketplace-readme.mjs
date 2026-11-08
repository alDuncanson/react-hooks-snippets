// Writes the README the Marketplace gets: node scripts/marketplace-readme.mjs <out>
// The Marketplace rejects SVG images unless they come from a few trusted hosts,
// so the self-hosted badges are dropped; the listing shows installs and rating itself.
import { readFileSync, writeFileSync } from 'node:fs'

const [out = 'README.marketplace.md'] = process.argv.slice(2)
const selfHosted = /\[!\[[^\]]*\]\(https:\/\/raw\.githubusercontent\.com\/[^)]*\.svg\)\]\([^)]*\) ?/g
const badgeRowBreak = /(\]\([^)\n]*\)) *\n\n(?=\[!\[)/g

const readme = readFileSync('README.md', 'utf8')
	.replace(selfHosted, '')
	.replace(badgeRowBreak, '$1 ')
	.replace(/ +$/gm, '')
writeFileSync(out, readme)
console.log(`wrote ${out}`)
