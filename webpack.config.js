const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./grunt/webpack');

let serverConfig = {
	devServer: {
		compress: true,
		inline: true,
		hot: true,
		publicPath: "/assets/",
		contentBase: './dist/',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	}
};
module.exports = merge(baseConfig.prod, serverConfig);