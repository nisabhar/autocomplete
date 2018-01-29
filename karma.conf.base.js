const merge = require('webpack-merge');
module.exports = {
	frameworks: ['mocha', 'chai'],
	plugins: [
		require('karma-mocha'),
		require('karma-chai'),
		require('karma-sinon'),
		require('karma-chrome-launcher'),
		require('karma-firefox-launcher'),
		require('karma-mocha-reporter'),
		require('karma-webpack'),
		require('karma-sourcemap-loader')
	],
	files: [
		'src/main/**/*.js',
		'src/test/**/*.js'
	],
	'client': {
		'mocha': {
			reporter: 'html',
			grep: ''
		}
	},

	preprocessors: {
		'src/main/**/*.js': ['webpack'],
		'src/test/**/*.js': ['webpack', 'sourcemap']
	},

	webpack: merge(require('./webpack.config.js'), {
		output: {
			publicPath: '/base/'
		},
		devtool: 'cheap-module-inline-source-map'
	}),

	reporters: ['mocha'],

	port: 9876,
	colors: true,
	autoWatch: true,
	singleRun: false,

	browsers: ['ChromeHeadless', 'Chrome', 'Firefox'],

};