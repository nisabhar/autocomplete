module.exports = {
	prod: {
		entry: './src/main/js/main.js',
		output: {
			filename: 'dist/bundle.js'
		},
		devtool: 'cheap-module-source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				}, {
					test: /\.html$/,
					use: [{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}]
				},
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                }
			]
		}
	}

};