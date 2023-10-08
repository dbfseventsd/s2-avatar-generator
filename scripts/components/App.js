import { file, image, settings, text, source } from '../store.js'
import { avatarRenderer, debounce, useFile, useText } from '../utils.js'

import Editor from './Editor.js'
import DownloadButton from './DownloadButton.js'
import DiscordPreview from './DiscordPreview.js'

/** @param {DragEvent} event */
function onDrop(event) {
	event.preventDefault()
	useFile(Array.from(event.dataTransfer.items).find(item => item.kind == 'file').getAsFile())
	document.body.classList.remove('file-dragged')
}

/** @param {DragEvent} event */
function onDragOver(event) {
	event.preventDefault()
	document.body.classList.add('file-dragged')
}

/** @param {DragEvent} event */
function onDragLeave(event) {
	event.preventDefault()
	document.body.classList.remove('file-dragged')
}

/** @type {m.FactoryComponent} */
export default function() {
	const render = avatarRenderer(new OffscreenCanvas(512, 512))

	// Tiny debounce to prevent double rendering when image and scale get set at the same time
	m.stream.lift(
		debounce(render, 10), image, settings.x, settings.y, settings.scale, settings.stroke, settings.shadow, settings.whiten
	)

	source.map(source => {
		switch (source) {
			case 'file': useFile(file()); break
			case 'text': useText(text()); break
		}
	})

	return {
		oncreate() {
			document.body.addEventListener('drop', onDrop)
			document.body.addEventListener('dragover', onDragOver)
			document.body.addEventListener('dragleave', onDragLeave)
		},

		onbeforeremove() {
			document.body.removeEventListener('drop', onDrop)
			document.body.removeEventListener('dragover', onDragOver)
			document.body.removeEventListener('dragleave', onDragLeave)
		},

		view() {
			return m('div', { class: 'app' }, [
				m('div', { class: 'padded separate' },
					m(Editor),
				),
				m('div', { class: 'padded separate' },
					m(DiscordPreview)
				),
				m('div', { class: 'padded separate' },
					m(DownloadButton)
				)
			])
		}
	}
}
