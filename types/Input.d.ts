declare namespace Input {
	interface Values {
		text: string,
		number: number,
		checkbox: boolean
	}

	type Value<K extends keyof Values> = Values[K]

	interface Types {
		string: 'text',
		number: 'number',
		boolean: 'checkbox'
	}

	type Type<K extends keyof Types> = Types[K]
}

declare namespace Input.Attributes {
	interface Base<T> {
		label: string,
		id: string,
		value?: T,
		stream?: m.Stream<T>,
		disabled?: boolean,
		class?: string,
		labelClass?: string,
		oninput?: (event: InputEvent) => void
	}

	interface Text {
		type: 'text'
	}

	interface Number {
		type: 'number',
		step?: number,
		min?: number,
		max?: number
	}

	interface Checkbox {
		type: 'checkbox',
		checked?: boolean
	}

	interface ByType {
		text: Text,
		number: Number,
		checkbox: Checkbox
	}
}

type Inputs = {[K in keyof Input.Values]: Input.Attributes.Base<Input.Value<K>> & Input.Attributes.ByType[K]}
type Input = Inputs[keyof Inputs]
