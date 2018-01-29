module.exports = function (grunt, options) {
	return {
		dist: {
			options: {
				patterns: [
					{
						match: /..\/..\/node_modules/g,
						replacement: 'node_modules'
					}
				]
			},
			files: [
				{expand: true, flatten: true, src: ['src/main/index.html'], dest: 'dist/'}
			]
		},
		webpack: {
			options: {
				patterns: [
					{
						match: /js\/main.js/g,
						replacement: 'bundle.js'
					}
				]
			},
			files: [
				{expand: true, flatten: true, src: ['dist/index.html'], dest: 'dist/'}
			]
		},
		preWatch: {
			options: {
				patterns: [
					{
						match: /bundle.js/g,
						replacement: 'http://localhost:8080/bundle.js'
					}
				]
			},
			files: [
				{expand: true, flatten: true, src: ['dist/index.html'], dest: 'dist/'}
			]
		},
		afterWatch: {
			options: {
				patterns: [
					{
						match: /http:\/\/localhost:8080\/bundle.js/g,
						replacement: 'bundle.js'
					}
				]
			},
			files: [
				{expand: true, flatten: true, src: ['dist/index.html'], dest: 'dist/'}
			]
		}
	}
};