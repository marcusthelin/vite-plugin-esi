import type { NodeEsiOptions } from './';

declare module 'nodesi' {
    export default class ESI {
        constructor(options?: NodeEsiOptions);
        process(html: string): string;
    }
}
