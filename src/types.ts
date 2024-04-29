import type { NodeEsiOptions } from 'nodesi';

export type Tag = {
	src: string;
	type?: 'include' | 'remove';
	onError?: 'continue' | 'abort';
};

export type EsiTags = {
	[name: string]: Tag[];
};

export type EsiOptions = {
	nodeEsi?: NodeEsiOptions;
	headers?: Record<string, string>;
};

export type Options = {
	esiOptions?: EsiOptions;
	esi: EsiTags;
	resolveESI?: boolean;
};
