module.exports = function(grunt){

	const path = require('path');

	require('load-grunt-config')(grunt, {
		// path to task.js files, defaults to grunt dir
		configPath: path.join(process.cwd(), 'grunt'),

		// auto grunt.initConfig
		init: true,

		// can optionally pass options to load-grunt-tasks.
		// If you set to false, it will disable auto loading tasks.
		loadGruntTasks: {

			pattern: 'grunt-*',
			config: require('./package.json'),
			scope: 'devDependencies'
		}
	});
};