declare namespace Discord.Message {
	interface Attrs {
		user: string,
		content: string | string[]
		reply?: boolean,
		preview?: number
	}
}

declare namespace Discord.Popup {
	interface Attrs {
		user: string,
		preview?: number
	}
}
