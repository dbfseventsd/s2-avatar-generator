import { avatar, file, image, settings, source, text } from './store.js'

/** @type {Utils.debounce} */
export function debounce(fn, time) {
	/** @type {number} */
	let timeout
	return function() {
		clearTimeout(timeout)
		timeout = setTimeout(fn.bind(this, ...arguments), time)
	}
}

/** @type {Utils.capitalize} */
export function capitalize(string) {
	return string
		? string[0].toUpperCase() + string.slice(1)
		: ''
}

/** @type {Utils.setImage} */
function setImage(imageBitmap = null, scale = 1) {
	image()?.close()
	image(imageBitmap)
	settings.scale(Math.round(scale * 1000) / 1000)
}

/** @type {Utils.useFile} */
export function useFile(input) {
	if (!input) {
		setImage()
		return
	}

	if (source() != 'file') {
		source('file')
	}

	file(input)

	createImageBitmap(input).then(imageBitmap =>  {
		setImage(imageBitmap, 320 / Math.max(imageBitmap.width, imageBitmap.height))
	})
}

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

/** @type {Utils.useText} */
export function useText(input) {
	text(input)

	if (!input) {
		setImage()
		return
	} else {
		// Magic numbers
		const fontSize = 308
		const characterWidth = 350
		const tracking = 162

		canvas.width = tracking + characterWidth * input.length
		canvas.height = fontSize

		ctx.font = `${fontSize}px Equalize`
		ctx.textAlign = 'center'
		ctx.textBaseline = 'alphabetic' // Middle is not consistent between browsers

		const x = canvas.width / 2 - (input[0] == '7' ? 0 : 40)
		const y = canvas.height / 2 + 150

		ctx.fillStyle = '#fff'
		ctx.fillText(input, x, y)

		if (source() != 'text') {
			source('text')
		}
	}

	createImageBitmap(canvas).then(imageBitmap =>  {
		setImage(imageBitmap, 420 / canvas.width)
	})
}

/** @type {Utils.classes} */
export function classes(base, conditional) {
	const classes = [base]
	for (const className in conditional) {
		if (conditional[className]) {
			classes.push(className)
		}
	}
	return classes.join(' ')
}

/** @type {Utils.avatarRenderer} */
export function avatarRenderer(canvas) {
	const ctx = /** @type {OffscreenCanvasRenderingContext2D} */ (/** @type {unknown} */ canvas.getContext('2d'))

	const bg = new OffscreenCanvas(canvas.width, canvas.height)
	const bgCtx = /** @type {OffscreenCanvasRenderingContext2D} */ (/** @type {unknown} */ bg.getContext('2d'))

	const gradient = bgCtx.createLinearGradient(0, 0, 617, 221.44)
	gradient.addColorStop(0, '#2899DD')
	gradient.addColorStop(0.5, '#2899DD')
	gradient.addColorStop(0.5, '#F30745')
	gradient.addColorStop(1, '#F30745')
	bgCtx.fillStyle = gradient
	bgCtx.fillRect(0, 0, 512, 512)
	bgCtx.strokeStyle = '#000000'
	bgCtx.lineWidth = 6.4
	bgCtx.beginPath()
	bgCtx.moveTo(163.4, 512)
	bgCtx.lineTo(348.16, 0)
	bgCtx.stroke()

	return function render(image, x, y, scale, stroke, shadow, whiten) {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		if (!image) {
			// Background
			ctx.drawImage(bg, 0, 0)
		} else {
			const shouldWhiten = whiten && source() == 'file'

			const x0 = 256 + x * 3.2 - image.width * scale / 2
			const y0 = 252 + y * 3.2 - image.height * scale / 2
			const width = image.width * scale
			const height = image.height * scale

			// Stroke
			if (stroke) {
				const da = Math.PI / 8
				for (let d = 1; d <= 6; d+= 1) {
					const offset = d / 6 * da
					for (let a = 0; a < Math.PI * 2; a+= Math.PI / 8) {
						const x1 = x0 + Math.cos(a + offset) * d
						const y1 = y0 + Math.sin(a + offset) * d
						ctx.drawImage(image, x1, y1, width, height)
					}
				}
				ctx.globalCompositeOperation = 'source-in'
				ctx.fillStyle = '#000'
				ctx.fillRect(0, 0, canvas.width, canvas.height)
			}

			// Shadow
			if (shadow) {
				if (!stroke) {
					ctx.drawImage(image, x0, y0, width, height)
					ctx.globalCompositeOperation = 'source-in'
					ctx.fillStyle = '#000'
					ctx.fillRect(0, 0, canvas.width, canvas.height)
				}
				ctx.globalCompositeOperation = 'source-over'
				for (let d = 1; d < 14; d++) {
					ctx.drawImage(canvas, 1, 1, canvas.width, canvas.height)
				}
			}

			// Draw background behind
			ctx.globalCompositeOperation = 'destination-over'
			ctx.drawImage(bg, 0, 0)

			// Original image
			ctx.globalCompositeOperation = shouldWhiten ? 'xor' : 'source-over'
			ctx.drawImage(image, x0, y0, width, height)

			// Whiten (image hole from xor)
			if (shouldWhiten) {
				ctx.globalCompositeOperation = 'destination-over'
				ctx.fillStyle = '#fff'
				ctx.fillRect(0, 0, canvas.width, canvas.height)
			}
		}

		updateImage(canvas)
	}
}

/** @type {Utils.canvasAsImage} */
export async function canvasAsImage(canvas) {
	// @ts-ignore
	const blob = await canvas.convertToBlob()
	return URL.createObjectURL(blob)
}

/** @type {Utils.updateImage} */
export async function updateImage(canvas) {
	avatar(await canvasAsImage(canvas))
	m.redraw()
}
