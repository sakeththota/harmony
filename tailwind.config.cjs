/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#5E81AC',
				secondary: '#81a1c1',
				accent: '#88C0D0',
				neutral: '#D8DEE9',
				'base-100': '#141416',
				info: '#b48ead',
				success: '#a3be8c',
				warning: '#ebcb8b',
				error: '#bf616a'
			}
		}
	},
	plugins: []
};
