// Webpack config file
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
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
};
