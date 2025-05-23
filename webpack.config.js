const defaults = require('@wordpress/scripts/config/webpack.config')
const path = require('path')

module.exports = {
	...defaults,
	entry: {
		...defaults.entry(),
		exhibition_meta: path.resolve(process.cwd(), 'src', 'exhibition_meta.tsx'),
		event_meta: path.resolve(process.cwd(), 'src', 'event_meta.tsx'),
		mptab_settings: path.resolve(process.cwd(), 'src', 'mptab_settings.tsx'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(process.cwd(), 'build'),
	},
	module: {
		...defaults.module,
		rules: [
			...defaults.module.rules,
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.json',
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [
			'.ts',
			'.tsx',
			...(defaults.resolve
				? defaults.resolve.extensions || ['.js', '.jsx']
				: []),
		],
	},
}
