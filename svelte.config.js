import adapter from '@sveltejs/adapter-vercel';

const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$component: "src/component",
		},
	}
};

export default config;
