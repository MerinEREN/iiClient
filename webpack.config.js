var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: path.join(__dirname, 'public/js'),
		filename: 'bundle.js'
	},
	watch: true,
	plugins: [
		/* 
		// Define production build to allow React to strip out unnecessary checks
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		// Minify the bundle
		new webpack.optimize.UglifyJsPlugin({
			compress: {
		// suppresses warnings, usually from module minification
				warnings: false,
			},
		}),
		// Allows error warnings but does not stop compiling.
		new webpack.NoErrorsPlugin(),
		// Transfer Files
		new TransferWebpackPlugin([
			{from: 'www'},
		], path.resolve(__dirname, 'public')), */
	],
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: [
						{
							"plugins": ["transform-object-rest-spread"]
						},
						'es2015',
						'react'
					]
				}
			}
		]
	},
};
