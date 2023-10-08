import { source, text } from './store.js'

Promise.all([
	new FontFace('Equalize', 'url(./assets/Equalize.ttf)').load().catch(console.error),
	import('./components/App.js')
]).then(([font, { default: App }]) => {
	if (font) {
		document.fonts.add(font)
	} else {
		source('file')
		text(null)
	}

	m.mount(document.querySelector('.main-content'), {
		view: function() {
			return m(App)
		}
	})
})
