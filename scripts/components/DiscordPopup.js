import Preview from './Preview.js'

/** @type {m.FactoryComponent<Discord.Popup.Attrs>} */
export default function() {
	return {
		view(vnode) {
			return [
				m('div', { class: 'discord-popup' }, [
					m('div', { class: 'discord-popup-avatar' }, m(Preview, { size: vnode.attrs.preview })),
					m('div', { class: 'discord-popup-content' }, [
						m('div', { class: 'separate' }, [
							m('div', { class: 'discord-popup-user' }, vnode.attrs.user),
							m('div', { class: 'discord-popup-tag' }, vnode.attrs.user)
						]),
						m('div', { class: 'separate' }, [
							m('div', { class: 'discord-popup-heading' }, 'About me'),
							m('blockquote', [
								m('p', 'Now somewhat intoxicated but undeniably powerful'),
								m('footer', '- Pontmaster, The Neocity Chronicles')
							])
						])
					])
				])
			]
		}
	}
}
