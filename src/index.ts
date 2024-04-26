import type { Plugin } from 'vite';
import type { Options } from './types';
import { resolveESI, transformHtml } from './transform';

export default function esiPlugin(options: Options): Plugin {
	const shouldResolveESI = options.resolveESI ?? true;
	return {
		name: 'vite-plugin-esi',
		transformIndexHtml(inputHtml) {
			const html = transformHtml(inputHtml, options.esi);
			if (shouldResolveESI) {
				return resolveESI(html);
			}
		},
	};
}
