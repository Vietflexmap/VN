import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import {readFileSync} from 'node:fs';
import {defineConfig} from 'rollup';
import pkg from '../package.json' with {type: 'json'};

const STATIC_ASSETS = [
	['leaflet.css', 'vietflex.css'],
	['leaflet.css', 'leaflet.css'],
	['images/logo.svg', 'images/logo.svg'],
	['images/layers.svg', 'images/layers.svg'],
	['images/marker-icon.svg', 'images/marker-icon.svg'],
	['images/marker-shadow.svg', 'images/marker-shadow.svg']
];

/** @type {import('rollup').OutputPlugin} */
const staticAssetsPlugin = {
	name: 'static-assets',
	generateBundle() {
		for (const [sourceName, fileName] of STATIC_ASSETS) {
			const source = readFileSync(new URL(`../src/${sourceName}`, import.meta.url));
			this.emitFile({type: 'asset', fileName, source});
		}
	},
};

const banner = `/* @preserve
 * Vietflex ${pkg.version}, Vietnam-first interactive maps. ${pkg.homepage}
 * Built on Leaflet; Leaflet-derived code remains under the BSD-2-Clause license.
 * (c) 2010-${new Date().getFullYear()} Volodymyr Agafonkin, (c) 2010-2011 CloudMade
 * Vietflex additions (c) ${new Date().getFullYear()} Long Ngo, MIT licensed.
 */
`;

/** @type {import('rollup').OutputOptions} */
const commonOptions = {
	banner,
	sourcemap: true
};

/** @type {import('rollup').OutputOptions} */
const umdOptions = {
	...commonOptions,
	name: 'Vietflex',
	format: 'umd',
	freeze: false,
	noConflict: true,
	amd: {
		id: pkg.name
	}
};

export default defineConfig({
	input: './src/Leaflet.js',
	plugins: [json()],
	output: [
		{
			...commonOptions,
			file: pkg.exports['.'],
			plugins: [staticAssetsPlugin]
		},
		{
			...commonOptions,
			file: './dist/vietflex.esm.js',
			plugins: [terser()],
		},
		{
			...umdOptions,
			file: './dist/vietflex-global-src.js',
		},
		{
			...umdOptions,
			file: './dist/vietflex.js',
			plugins: [terser()],
		},
		{
			...umdOptions,
			file: './dist/vietflex-global.js',
			plugins: [terser()],
		}
	]
});
