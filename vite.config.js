import { sveltekit } from '@sveltejs/kit/vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		wasm(),
    topLevelAwait()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
