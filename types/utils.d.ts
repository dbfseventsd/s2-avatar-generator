declare namespace Utils {
	function debounce<T>(fn: (...values: T extends any[] ? T : any[]) => void, time: number): (...values: T extends any[] ? T : any[]) => void
	function capitalize(string: string): string
	function setImage(imageBitmap?: ImageBitmap | null, scale?: number): void
	function useFile(input: Parameters<typeof createImageBitmap>[0]): void
	function useText(input: string): void
	function classes(base: string, conditional: Record<string, boolean>): string
	function avatarRenderer(canvas: OffscreenCanvas): (image: StreamType<Store.Image>, x: StreamType<Settings['x']>, y: StreamType<Settings['y']>, scale: StreamType<Settings['scale']>, stroke: StreamType<Settings['stroke']>, shadow: StreamType<Settings['shadow']>, whiten: StreamType<Settings['whiten']>) => void
	function canvasAsImage(canvas: OffscreenCanvas): Promise<string>
	function updateImage(canvas: OffscreenCanvas): Promise<void>
}
