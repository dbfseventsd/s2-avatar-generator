import { classes } from '../utils.js'
import { avatar, image } from '../store.js'

/** @type {m.FactoryComponent} */
export default function() {
	return {
		view() {
			return m('a', {
				href: avatar(),
				download: 'Soldat-2-avatar',
				class: classes('button download-button', { disabled: !image() }),
			}, 'Download')
		}
	}
}
