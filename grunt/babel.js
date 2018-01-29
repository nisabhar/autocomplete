module.exports = function (grunt, options) {
	return {
		options: {
			sourceMap: true,
			presets: ['es2015']
		},
		dist: {
			files: [
				{
					expand: true,
					cwd: 'src/main/',
					src: ['**/*.js'],
					dest: 'dist/'
				}
			]
		}
	}
};