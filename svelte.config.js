import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapter({
			fallback: 'app.html' // may differ from host to host
		}),
		alias: {
			$component: "src/component",
			$lib: "src/lib",
		},
	}
};

export default config;
