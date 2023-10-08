import { useText } from '../utils.js'
import { source, text } from '../store.js'

import Input from './Input.js'

/**
 * @typedef {m.FactoryComponent} TextSource
 * @type {TextSource}
 */
export default function() {
	/** @param {InputEvent & { target: HTMLInputElement }} event */
	function createImage(event) {
		event.preventDefault()
		useText(event.target.value.trim())
	}

	source.map(source => {
		if (source != 'text') {
			return
		}
		requestAnimationFrame(() => { // Wait for this component to update
			requestAnimationFrame(() => { // Wait for Input component to update
				/** @type {HTMLInputElement | undefined} */ (document.querySelector('#source-text-input'))?.focus()
			})
		})
	})

	return {
		view() {
			return m(Input, {
				type: 'text',
				label: 'Text',
				id: 'source-text-input',
				class: 'source-input',
				labelClass: 'visually-hidden',
				disabled: source() != 'text',
				value: text(),
				oninput: createImage
			})
		}
	}
}
