/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,ts,svelte}", "node_modules/bootstrap-icons/font/*"],
	theme: {
		fontFamily: {
			sans: ["Livvic", "sans-serif"]
		},
		extend: {
			colors: {
				techlabspink: "#ea375b"
			}
		}
	},
	plugins: []
};
