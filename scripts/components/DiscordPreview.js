import DiscordMessage from './DiscordMessage.js'
import DiscordPopup from './DiscordPopup.js'

// /** @type {Discord.Message.Attrs[]} */
const messages = [
	{
		user: 'dbfseventsd',
		content: 'Reply size',
		reply: true,
		preview: 16
	},
	{
		user: 'dbfseventsd',
		content: 'Normal avatar size',
		preview: 40
	},
	{
		user: 'S2 community',
		content: ['Wow!', 'Such a cool avatar']
	}
]

/** @type {m.FactoryComponent} */
export default function() {
	return {
		view() {
			return m('div', { class: 'discord' }, [
				m(DiscordPopup, { user: 'dbfseventsd', preview: 80 }),
				messages.map(message => m(DiscordMessage, message))
			])
		}
	}
}
