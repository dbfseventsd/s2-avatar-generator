type GlobalStreamType<T extends m.Stream<any>> = StreamType<T>

interface Settings {
	x: m.Stream<number>,
	y: m.Stream<number>,
	scale: m.Stream<number>,
	stroke: m.Stream<boolean>,
	shadow: m.Stream<boolean>,
	whiten: m.Stream<boolean>
}

declare namespace Settings {
	type Key = keyof Settings
	type StreamType<K extends keyof Settings> = TypeOfResult<GlobalStreamType<Settings[K]>>
	type InputType<K extends keyof Settings> = Input.Types[StreamType<K>]
}

declare namespace Store {
	type SourceOption = 'file' | 'text'
	type Source = m.Stream<SourceOption | ''>

	type Text = m.Stream<string | null>
	type File = m.Stream<Parameters<typeof createImageBitmap>[0] | null>
	type Image = m.Stream<ImageBitmap | null>
	type Avatar = m.Stream<string>
}
