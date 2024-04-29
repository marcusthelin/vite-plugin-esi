declare module 'nodesi' {
	type NodeEsiOptions = {
		onError?: (src: string, err: Error) => string;
		allowedHosts?: string[];
		baseUrl?: string;
	};
	type ProcessOptions = {
		headers?: Record<string, string>;
	};
	export default class ESI {
		constructor(options?: NodeEsiOptions);
		process(html: string, options?: ProcessOptions): Promise<string>;
	}
}
