import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			// The default mdsvex extension is .svx; this overrides that.
			extensions: ['.md'],
		}),
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
