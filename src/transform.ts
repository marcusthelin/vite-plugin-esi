import ESI, { type NodeEsiOptions } from 'nodesi';
import { TagsNotFoundError } from './errors';
import type { EsiOptions } from './types';
const regex = /<!--*\s*vite-plugin-esi\s(name="(?<name>[a-zA-Z0-9]+)").*->/g; // example <!-- vite-plugin-esi name="header" -->

// Will transform the html by replacing the special comments with the esi tags
export function transformHtml(html: string, options: EsiOptions): string {
	return html.replace(regex, (_match, _, __, ___, ____, groups) => {
		const tags = options[groups.name];
		if (!tags) {
			throw new TagsNotFoundError(`no tags found for ${groups.name}`);
		}

		return tags
			.map((tag) => {
				const { src, type = 'include', onError = 'abort' } = tag;
				return `<esi:${type} src="${src}" onerror="${onError}" />`;
			})
			.join('\n');
	});
}

export function resolveESI(html: string, options?: NodeEsiOptions) {
	const esi = new ESI(options);
	return esi.process(html);
}
