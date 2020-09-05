const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 抽离css文件，把css 文件以 link 外链形式插入 header 头部;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 压缩js代码
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	// 配置优化规则
	optimization: {
		// 压缩优化
		minimizer: [
			// 压缩css, 导致js 压缩不再执行自己默认的压缩方式,也走该css压缩方式,导致无法被压缩;
			new OptimizeCSSAssetsPlugin(),

			new UglifyjsWebpackPlugin({
				cache: true, // 是否使用缓存
				parallel: true, // 是否并发编译
				sourceMap: true //源码映射,方便调试
			})
		],
	},
	entry: './src/home.js',
	output: {
		// filename: '[name]_[hash:6].bundle.js',
		filename: 'js/bundle.min.js',
		// path: path.join(__dirname, 'dist'),
		path: path.resolve(__dirname, 'dist'),
		publicPath: './' // 编译后引用资源地址前面设置前缀
	},
	// 关于webpack-dev-server 的一些配置
	devServer: {
		port: 3000, // 指定端口号
		progress: true, // 显示打包编译进度
		contentBase: './dist', // 指定当前服务处理资源的目录
		open: true, //编译完成，自动打开浏览器
	},
	// mode: 'development',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(css|less)$/i,
				// loader 执行顺序从 右到左
				use: [
					MiniCssExtractPlugin.loader, // MiniCssExtractPlugin 提供的loader
					// 'style-loader', // 将编译好的css插入到页面head中 (内嵌样式)
					'css-loader', // 编译 @import/url() 这种语法
					'postcss-loader', // 不能和 css-loader 调换顺序, 需要额外配置 browserslist https://github.com/browserslist/browserslist
					'less-loader' // 效果同下, 可以写成对象
					// {
					// 	loader: "less-loader",
					// 	options: {
					// 		// 额外的配置
					// 	}
					// }
				]
			},
			{
				test: /\.js$/i,
				use: [{
					loader: "babel-loader",
					options: {
						// 基于 BABEL 的语法解析包 ES6 -> ES5
						presets: [
							"@babel/preset-env"
						],
						// 使用插件处理 大于ES6 中的特殊语法
						plugins: [
							[
								"@babel/plugin-proposal-class-properties", {
									"legacy": true
							}],
							[
								"@babel/plugin-proposal-decorators", {
									"decoratorsBeforeExport": true,
									"loose": true
							}],
							// 编辑特殊语法 promise async await
							"@babel/plugin-transform-runtime"
						]
					}
				},{
					loader: "eslint-loader"
				}],
				// 指定JS编译的目录、忽略的目录
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.(png|jpg|jpeg|gif|ico|webp|bmp)$/i,
				use: [
				// {
				// 	loader: "file-loader",
				// 	options: {
				// 		esModule: false,
				// 		outputPath: 'images' // 控制图片打包后图片所在的目录
				// 	}
				// },
				{
					loader: "url-loader",
					options: {
						// 只要图片小于200KB的直接转base64；
						limit: 200 * 1024,
						esModule: false,
						outputPath: 'images' // 控制图片打包后图片所在的目录
					}
				}
			],
			},
			{
				test: /\.(html|htm|xml)$/i,
				loader: "html-withimg-loader" // 用于html文件中导入的img图片
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			// 不指定模板会默认模板创建一个HTML页面,当然真实项目中都指向自己写好的HTML进行编译
			template: './src/index.html',
			filename: "index.html",
			hash: true, // 处理打包后的js,避免环境生成 hash;
			minify: {
				// 控制输出的 html 文件配置
				collapseWhitespace: true,
				removeComments: true,
				removeAttributeQuotes: true,
				removeEmptryAttributes: true // 移除空属性
			},
		}),
		new MiniCssExtractPlugin({
			// 指定输出的css文件名
			filename: 'css/main.min.css',
		})
	]
}

