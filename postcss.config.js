module.exports = {
	plugins: [
		require('@tailwindcss/postcss'),
		require('autoprefixer')({ grid: true }),
		...(process.env.NODE_ENV === 'production' ? require('cssnano') : ''),
	],
}
