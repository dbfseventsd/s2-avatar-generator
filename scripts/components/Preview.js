import { avatar } from '../store.js'

/** @type {m.FactoryComponent<Preview.Attrs>} */
export default function() {
	return {
		view(vnode) {
			return vnode.attrs.size && m('img', {
				src: avatar(),
				class: 'avatar',
				style: `--size: ${vnode.attrs.size}px`
			})
		}
	}
}
