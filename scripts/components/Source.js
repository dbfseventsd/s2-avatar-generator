import { capitalize, classes } from '../utils.js'
import { source, text } from '../store.js'

import TextSource from './TextSource.js'
import FileSource from './FileSource.js'

/** @type {{ value: Store.SourceOption, component: FileSource | TextSource, disabled: m.Stream<boolean> }[]} */
const inputs = [
	{ value: 'text', component: TextSource, disabled: text.map(text => text == null) },
	{ value: 'file', component: FileSource, disabled: m.stream(false) }
]

/**
 * @typedef {m.FactoryComponent} Source
 * @type {Source}
 */
export default function() {
	return {
		view() {
			return [
				m('div', { class: 'editor-label' }, 'Source'),
				m('div', { class: 'source-inputs pairs wide-pairs' }, [
					inputs.map(({ value, component, disabled }) => [
						m('label', { class: classes('', { disabled: disabled() }) }, [
							m('input', {
								type: 'radio',
								value,
								disabled: disabled(),
								checked: source() == value,
								onchange: () => source(value)
							}),
							capitalize(value)
						]),
						m(component)
					])
				])
			]
		}
	}
}
