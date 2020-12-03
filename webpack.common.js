const path = require('path');
const { IgnorePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
	entry: ['@babel/polyfill', './src'],
	plugins: [
		new DotenvWebpackPlugin({
			path: path.resolve(process.cwd(), '.env'),
		}),
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