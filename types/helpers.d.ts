type TypeOfResult<T> =
	T extends string ? 'string' :
	T extends number ? 'number' :
	T extends bigint ? 'bigint' :
	T extends boolean ? 'boolean' :
	T extends symbol ? 'symbol' :
	T extends undefined ? 'undefined' :
	T extends ((...args: never[]) => unknown) | (abstract new (...args: never[]) => unknown) ? 'function' :
	'object'

// Mithril stream's type
type StreamType<T extends m.Stream<any>> = ReturnType<T['valueOf']>
