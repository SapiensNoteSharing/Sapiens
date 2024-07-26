import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

const ignored = [
	'a11y-click-events-have-key-events', 
	'css-unused-selector'
]

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	onwarn: (warning, handler) => {
		if (ignored.includes(warning.code)) {
			return;
		}
		console.log(warning.code)
		handler(warning);
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'$css': 'src/style',
			'$route': 'src/routes'
		}
	}
};

export default config;
