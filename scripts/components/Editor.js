import { capitalize } from '../utils.js'
import { image, settings, source } from '../store.js'

import Source from './Source.js'
import Input from './Input.js'

const keys = /** @type {(Settings.Key)[]} */ (Object.keys(settings))

/** @type Input.Types */
const inputStreamTypeMap = {
	string: 'text',
	number: 'number',
	boolean: 'checkbox'
}

/**
 * @param {Settings.Key} key
 * @return {Inputs[Settings.InputType<key>]} attributes
 */
const inputAttributes = key => {
	const streamType = /** @type {Settings.StreamType<Settings.Key>} */ (/** @type {unknown} */ typeof settings[key]())

	/** @type {ReturnType<inputAttributes>} */
	return /** const */ ({
		type: inputStreamTypeMap[streamType],
		label: capitalize(key),
		id: `settings-${key}`,
		disabled: !image() || (key == 'whiten' && source() != 'file'),
		class: 'editor-input',
		labelClass: 'editor-label',
		stream: settings[key],
		...inputSpecificAttributes[key]
	})
}

/** @type {Partial<{[K in Settings.Key]: Omit<Input.Attributes.ByType[Settings.InputType<K>], 'type'>}>} */
const inputSpecificAttributes = {
	scale: { step: 0.01, min: 0 },
}

/** @type {m.FactoryComponent} */
export default function() {
	return {
		view() {
			return m('div', { class: 'editor pairs' }, [
				m(Source),
				keys.map(key => m(Input, {
					...inputAttributes(key)
				}))
			])
		}
	}
}
