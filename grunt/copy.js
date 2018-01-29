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
					src: ['node_modules/jquery/dist/jquery.js',
						'node_modules/knockout/build/output/knockout-latest.debug.js',
						'node_modules/requirejs/require.js',
						'node_modules/underscore/underscore.js'],
					dest: 'dist/'
				}
			]
		}
	}
};