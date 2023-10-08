/** @type {Settings} */
export const settings = {
	x: m.stream(0),
	y: m.stream(0),
	scale: m.stream(1),
	stroke: m.stream(true),
	shadow: m.stream(true),
	whiten: m.stream(false)
}

/** @type {Store.Source} */
export const source = m.stream('text')

/** @type {Store.Text} */
export const text = m.stream('')

/** @type {Store.File} */
export const file = m.stream(null)

export const image = m.stream(null)
/** @type {Store.Image} */

/** @type {Store.Avatar} */
export const avatar = m.stream('')
