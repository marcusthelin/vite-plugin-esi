declare module 'nodesi' {
	type NodeEsiOptions = import('./types').NodeEsiOptions;
	type ProcessOptions = {
		headers?: Record<string, string>;
	};
	export default class ESI {
		constructor(options?: NodeEsiOptions);
		process(html: string, options?: ProcessOptions): Promise<string>;
	}
}
