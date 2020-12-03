const path = require('path');
const { IgnorePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['@babel/polyfill', './src'],
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		new IgnorePlugin(/\.test.js$/)
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				include: path.resolve(process.cwd(), './src'),
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	
};