import { NameNotFoundError, TagsNotFoundError } from '../errors';
import { transformHtml } from '../transform';
import { EsiOptions } from '../types';

// jest.mock('fetch');

describe('transformHtml', () => {
    type TestCase = {
        input: {
            html: string;
            options: EsiOptions;
        };
        expected: string | Error;
        name: string;
    };

    const testCases: TestCase[] = [
        {
            name: 'should replace a single comment',
            input: {
                html: '<!-- vite-plugin-esi name="header" -->',
                options: {
                    header: [
                        {
                            src: 'http://example.com/header.html',
                        },
                    ],
                },
            },
            expected: '<esi:include src="http://example.com/header.html" onerror="abort" />',
        },
        {
            name: 'should replace a single comment with multiple tags',
            input: {
                html: '<!-- vite-plugin-esi name="header" -->',
                options: {
                    header: [
                        {
                            src: 'http://example.com/header.html',
                        },
                        {
                            src: 'http://example.com/header2.html',
                        },
                    ],
                },
            },
            expected: `<esi:include src="http://example.com/header.html" onerror="abort" />
<esi:include src="http://example.com/header2.html" onerror="abort" />`,
        },
        {
            name: 'should error on missing option',
            input: {
                html: '<!-- vite-plugin-esi name="random"-->',
                options: {
                    header: [
                        {
                            src: 'http://example.com/header.html',
                        },
                    ],
                },
            },
            expected: new TagsNotFoundError('no tags found for random'),
        },
    ];

    for (const testCase of testCases) {
        it(testCase.name, () => {
            if (testCase.expected instanceof Error) {
                expect(() => transformHtml(testCase.input.html, testCase.input.options)).toThrow(
                    testCase.expected
                );
                return;
            }
            const transformedHtml = transformHtml(testCase.input.html, testCase.input.options);
            expect(transformedHtml).toBe(testCase.expected);
        });
    }
});
