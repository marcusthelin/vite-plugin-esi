export type Tag = {
	src: string;
	type?: 'include' | 'remove';
	onError?: 'continue' | 'abort';
};

export type NodeEsiOptions = {
	onError: (src: string, err: Error) => string;
	allowedHosts: string[];
	baseUrl: string;
};

export type EsiOptions = {
	[name: string]: Tag[];
};

export type Options = {
	esiOptions?: NodeEsiOptions;
	esi: EsiOptions;
	resolveESI?: boolean;
};
