import { classes, useFile } from '../utils.js'
import { source } from '../store.js'

/** @param {InputEvent & { target: HTMLInputElement }} event */
function onChange(event) {
	useFile(event.target.files[0])
}

/** @param {KeyboardEvent & { target: HTMLLabelElement }} event */
function onKeyPress(event) {
	switch (event.code) {
		case 'Space':
		case 'Enter':
			/** @type {HTMLInputElement} */ (/** @type {unknown} */ event.target.parentNode.lastElementChild).click()
			event.preventDefault()
			break
	}
}

/**
 * @typedef {m.FactoryComponent} FileSource
 * @type {FileSource}
 */
export default function() {
	return {
		view() {
			const disabled = source() != 'file'

			return m('label', [
				m('div', { class: classes('button file-button source-input', { disabled }), tabindex: disabled ? undefined : 0, onkeypress: onKeyPress }, 'Select'),
				m('input', {
					type: 'file',
					id: 'source-file-input',
					class: 'visually-hidden',
					disabled,
					tabindex: -1,
					accept: 'image/png, image/jpeg, image/jpg',
					onchange: onChange
				})
			])
		}
	}
}
