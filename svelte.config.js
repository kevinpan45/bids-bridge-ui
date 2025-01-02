import adapter from '@sveltejs/adapter-vercel';

const config = {
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x',
		}),
		alias: {
			$component: "src/component",
			$lib: "src/lib",
		},
	}
};

export default config;
