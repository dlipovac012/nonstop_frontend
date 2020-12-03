const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

// eslint-disable-next-line no-unused-vars
module.exports = (env, args) => merge(common, {
	mode: 'production',
	output: {
		publicPath: '/',
		filename: '[name].[hash].bundle.js',
		chunkFilename: '[name].[chunkhash].chunk.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: 'public/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),
	],
});