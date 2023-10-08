import { classes } from '../utils.js'

/**
 * @param {Input} attrs
 * @return {Omit<Input, 'label' | 'stream' | 'value'>}
 */
function inputAttributes(attrs) {
	if (attrs.type == 'checkbox') {
		attrs.checked = attrs.stream?.() ?? attrs.value ?? false
	}
	const { label, stream, value, labelClass, ...rest } = attrs
	return rest
}

/**
 * @param {Element} label
 * @param {Input['value']} value
 */
function setInputValue(label, value) {
	const input = /** @type {HTMLInputElement} */ (/** @type {unknown} */ label.nextElementSibling)
	if (input.type != 'checkbox') {
		input.value = value.toString()
	}
}

/**
 * @typedef {m.FactoryComponent<Input>} InputComponent
 * @type {InputComponent}
 */
export default function(vnode) {

	const value = m.stream(vnode.attrs.stream?.() ?? vnode.attrs.value ?? '')

	if (vnode.attrs.stream) {
		value.map(value => {
			// @ts-ignore
			vnode.attrs.stream(value)
		})
	}

	/** @param {InputEvent & { target: HTMLInputElement }} event */
	const onInput = event => {
		switch (typeof value()) {
			case 'string':
				value(event.target.value)
				break

			case 'number':
				if (event.target.checkValidity()) {
					value(Number(event.target.value))
				}
				break

			case 'boolean':
				value(event.target.checked)
				break
		}

		vnode.attrs.oninput?.(event)
	}

	return {
		oncreate(vnode) {
			setInputValue(vnode.dom, value())
		},

		onupdate(vnode) {
			if (vnode.attrs.stream && vnode.attrs.stream() != value()) {
				value(vnode.attrs.stream())
				setInputValue(vnode.dom, value())
			}
		},

		view(vnode) {
			return [
				m('label', { for: vnode.attrs.id, class: classes(vnode.attrs.labelClass, { disabled: vnode.attrs.disabled }) }, vnode.attrs.label),
				m('input', {
					...inputAttributes(vnode.attrs),
					oninput: onInput
				})
			]
		}
	}
}
