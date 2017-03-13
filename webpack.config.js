// Webpack config file
const path = require( 'path' );

module.exports = {
	entry: './client/index.jsx',
	output: {
		path: __dirname + '/assets/js',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				enforce: 'pre',
				use: {
					loader: 'eslint-loader',
					options: {
						emitWarning: true,
					},
				},
				include: path.resolve( __dirname, 'client' ),
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
};
