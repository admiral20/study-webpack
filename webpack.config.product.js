const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/home.js',
	output: {
		filename: '[name]_[hash:6].bundle.js',
		path: path.join(__dirname, 'static'),
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
}

