module.exports = function (grunt, options) {
	return {
		dev: {
			files: [
				{
					expand: true,
					cwd: 'src/main/',
					src: ['**'],
					dest: 'dist/'
				}
			]
		},
		prod: {
			files: [
				{
					expand: true,
					cwd: 'src/main/',
					src: ['*.html'],
					dest: 'dist/'
				},
                {
                    expand: true,
                    cwd: 'src/main/css',
                    src: ['*.css'],
                    dest: 'dist/css'
                }
			]
		},
		dependencies: {
			files: [
				{
					expand: true,
                    cwd: 'node_modules',
					src: ['jquery/dist/jquery.js',
						'knockout/build/output/knockout-latest.debug.js',
						'requirejs/require.js',
						'underscore/underscore.js'],
					dest: 'dist/libs'
				}
			]
		}
	}
};