const karmaConfig = require('./karma.conf.base.js');

karmaConfig.reporters.push('coverage');

karmaConfig.coverageReporter = {
	dir: 'coverage/',
	reporters: [
		{ type: 'html', subdir: 'report-html' },
		{ type: 'lcov', subdir: 'report-lcov' },
		{ type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
	]
};
karmaConfig.plugins = karmaConfig.plugins.concat([
	require('karma-coverage')
]);

karmaConfig.preprocessors['src/main/**/*.js'].push('coverage');

module.exports = function(config) {

	config.set(karmaConfig);

	return karmaConfig;
};
