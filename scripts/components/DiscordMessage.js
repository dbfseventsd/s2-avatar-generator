import { classes } from '../utils.js'

import Preview from './Preview.js'

/** @type {m.FactoryComponent<Discord.Message.Attrs>} */
export default function() {
	return {
		view(vnode) {
			return m('div', { class: classes('discord-message', { 'discord-message-reply': vnode.attrs.reply }) }, [
				m('div', { class: 'discord-message-avatar' }, m(Preview, { size: vnode.attrs.preview })),
				m('div', { class: 'discord-message-user' }, `${vnode.attrs.reply ? '@' : ''}${vnode.attrs.user}`),
				m('div', { class: 'discord-message-content' },
					Array.isArray(vnode.attrs.content)
						? vnode.attrs.content.map(row => m('div', row))
						: vnode.attrs.content
				)
			])
		}
	}
}
