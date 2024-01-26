# vite-plugin-esi
Vite plugin to resolve ESI with Nodesi.

## Getting Started

### Installation
```bash
npm i -D vite-plugin-esi
```
```bash
yarn add -D vite-plugin-esi
```
```bash
pnnpm add -D vite-plugin-esi
```

### Basic Usage
Use the required `esi` option to define ESI tags to be resolved. The keys of the object are the names of the html comments that will be replaced with the resolved ESI tags.

Comments must be in the following format:
```html
<!--vite-plugin-esi name="somename" -->
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import viteEsi from 'vite-plugin-esi'

export default defineConfig({
  plugins: [
    viteEsi({
        esi: {
            headFragments: [
                { src: "http://localhost:3000/esi/fragment1" },
                { src: "http://localhost:3000/esi/fragment2" }
            ]
        }
    })
  ]
})
```
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ESI Demo</title>
    <!--vite-plugin-esi name="headFragments" -->
</head>
<body>
    ....
</body>
</html>
```

### Options
| name       | type                          | optional | default | description                                                                      |
| ---------- | ----------------------------- | -------- | ------- | -------------------------------------------------------------------------------- |
| esiOptions | `NodeEsiOptions \| undefined` | `true`   | `n/a`   | Passed to `nodesi`.                                                              |
| esi        | `{ [name: string]: Tag[]; }`  | `false`  | `n/a`   |                                                                                  |
| resolveESI | `boolean \| undefined`        | `true`   | `true`  | If ESI tags should be resolved to html, or to keep them as-is in the final html. |

## Examples
### Keep ESI tags
If your production server is responsible for resolving ESI tags, you can set the `resolveESI` option to false to keep the tags as-is in the final html.
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import viteEsi from 'vite-plugin-esi'

export default defineConfig({
  plugins: [
    viteEsi({
        resolveESI: false,
        esi: {
            headFragments: [
                { src: "http://localhost:3000/esi/fragment1" },
                { src: "http://localhost:3000/esi/fragment2" }
            ]
        }
    })
  ]
})
```
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ESI Demo</title>
    <!--vite-plugin-esi name="headFragments" -->
</head>
<body>
    ....
</body>
</html>
```
```html
<!-- index.html (after build) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ESI Demo</title>
    <esi:include src="http://localhost:3000/esi/fragment1" onerror="abort"></esi:include>
    <esi:include src="http://localhost:3000/esi/fragment2" onerror="abort"></esi:include>
</head>
<body>
    ....
</body>
</html>
```
