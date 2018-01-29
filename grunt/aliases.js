module.exports = {
	'default': ['prod'],

	'prod': [
		'clean:dist',
		'webpack:prod',
		'copy:prod',
		'copy:dependencies',
		'replace:dist',
		'replace:webpack'
	],
	'dev': [
		'clean:dist',
		'copy:dev',
		'copy:dependencies',
		'replace:dist'
	],
	'quality': [
		'jsbeautifier',
		'eslint',
		'exec:stylefmt',
		'exec:stylelint'
	],
	'watch': [
		'prod',
		'exec:watch'
	],
	'test': [
		'exec:test'
	],
	'testChrome': [
		'exec:testChrome'
	],
	'testFirefox': [
		'exec:testFirefox'
	],
	'coverage': [
		'clean:coverage',
		'exec:coverage',
		'exec:printCoverage'
	]
};