// Renders a shields-style flat badge as SVG: node scripts/badge.mjs <label> <message> <color>
const WIDTHS = new Map(
	Object.entries({
		' ': 3.9, '.': 4, ',': 4, ':': 4.4, ';': 4.4, '-': 5, '/': 5, '(': 4.7, ')': 4.7, '%': 11.6, '+': 9, '_': 7, "'": 3,
		a: 6.6, b: 6.9, c: 5.9, d: 6.9, e: 6.7, f: 3.9, g: 6.9, h: 7, i: 3, j: 3.7, k: 6.4, l: 3, m: 10.5, n: 7,
		o: 6.7, p: 6.9, q: 6.9, r: 4.7, s: 5.8, t: 4.3, u: 7, v: 6.5, w: 9.1, x: 6.5, y: 6.5, z: 5.8,
		A: 7.5, B: 7.6, C: 7.7, D: 8.4, E: 6.9, F: 6.3, G: 8.4, H: 8.3, I: 4.6, J: 5, K: 7.6, L: 6.1, M: 9.3,
		N: 8.3, O: 8.7, P: 6.6, Q: 8.7, R: 7.7, S: 7.5, T: 6.7, U: 8.1, V: 7.5, W: 10.9, X: 7.5, Y: 6.7, Z: 7.5,
	}),
)
const COLORS = {
	brightgreen: '#4c1', green: '#97ca00', yellowgreen: '#a4a61d', yellow: '#dfb317', orange: '#fe7d37',
	red: '#e05d44', blue: '#007ec6', lightgrey: '#9f9f9f', blueviolet: '#8a2be2', grey: '#555',
}

const textWidth = (text) =>
	[...text].reduce((sum, char) => sum + (WIDTHS.get(char) ?? (/\d/.test(char) ? 7 : 7)), 0)

const escape = (text) =>
	text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const badge = (label, message, color = 'blue') => {
	const fill = COLORS[color] ?? (color.startsWith('#') ? color : `#${color}`)
	const labelText = textWidth(label)
	const messageText = textWidth(message)
	const labelWidth = Math.round(labelText + 10)
	const messageWidth = Math.round(messageText + 10)
	const width = labelWidth + messageWidth
	const text = (content, x, length) =>
		`<text aria-hidden="true" x="${x}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${length}">${content}</text>` +
		`<text x="${x}" y="140" transform="scale(.1)" fill="#fff" textLength="${length}">${content}</text>`
	const title = escape(`${label}: ${message}`)
	return (
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20" role="img" aria-label="${title}">` +
		`<title>${title}</title>` +
		`<linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>` +
		`<clipPath id="r"><rect width="${width}" height="20" rx="3" fill="#fff"/></clipPath>` +
		`<g clip-path="url(#r)"><rect width="${labelWidth}" height="20" fill="#555"/><rect x="${labelWidth}" width="${messageWidth}" height="20" fill="${fill}"/><rect width="${width}" height="20" fill="url(#s)"/></g>` +
		`<g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">` +
		text(escape(label), labelWidth * 5, Math.round(labelText * 10)) +
		text(escape(message), labelWidth * 10 + messageWidth * 5, Math.round(messageText * 10)) +
		`</g></svg>\n`
	)
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
	const [label, message, color] = process.argv.slice(2)
	if (!label || !message) {
		console.error('usage: node scripts/badge.mjs <label> <message> [color]')
		process.exit(2)
	}
	process.stdout.write(badge(label, message, color))
}
