import ESI from 'nodesi';
import type { Plugin } from 'vite';
import { Options } from './types';

export default function esiPlugin(options: Options): Plugin {
    const resolveESI = options.resolveESI ?? true;
    return {
        name: 'vite-plugin-esi',
        transformIndexHtml(html) {
            const regex = /<!--*\s*vite-plugin-esi\s(name="(?<name>[a-zA-Z0-9]+)").*->/g; // example <!-- vite-plugin-esi name="header" -->
            html = html.replace(regex, (match, _, __, ___, ____, groups) => {
                console.log(match, groups.name);
                if (!groups.name) {
                    throw new Error(`no name found in ${match}`);
                }
                const tags = options.esi[groups.name];
                if (!tags) {
                    throw new Error(`no tags found for ${groups.name}`);
                }

                return tags
                    .map(tag => {
                        const { src, type = 'include', onError = 'abort' } = tag;
                        return `<esi:${type} src="${src}" onerror="${onError}" />`;
                    })
                    .join('\n');
            });

            if (!resolveESI) {
                return html;
            }
            const esi = new ESI(options?.esiOptions);
            return esi.process(html);
        },
    };
}
