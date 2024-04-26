declare module 'nodesi' {
	type NodeEsiOptions = import('./types').NodeEsiOptions;
	export default class ESI {
		constructor(options?: NodeEsiOptions);
		process(html: string): Promise<string>;
	}
}
