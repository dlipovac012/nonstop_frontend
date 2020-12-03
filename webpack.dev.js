const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = (env, args) => {
	const host = args.host || 'localhost';
	const port = args.port || '3000';
    
	const WEB_ORIGIN = `http://${host}:${port}`;

	return merge(common, {
		mode: 'development',
		// devtool: 'eval-cheap-source-map',
		output: {
			publicPath: '/',
			filename: 'bundle.js',
			chunkFilename: '[name].chunk.js',
		},
		devServer: {
			host,
			port,
			hot: true,
			compress: true,
			publicPath: '/',
			contentBase: './',
			historyApiFallback: true,
			headers: {
				'Access-Control-Allow-Origin': WEB_ORIGIN,
				'Access-Control-Allow-Methods': 'GET',
				'X-Frame-Options': '\'deny\'',
				'X-XSS-Protection': '1; mode=block',
			},

		}
	});
};