const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const args = require('minimist')(process.argv.slice(2))
const extractCSS = new ExtractTextPlugin('[name].css')

let config
if (args.env === 'pub') {
    config = {
        entry: {
            Scrollload: './src/Scrollload.js'
        },
        output: {
            path: './lib',
            filename: '[name].js',
            library: 'Scrollload.js',
            libraryTarget: 'umd'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ],
                    include: path.resolve(__dirname, 'src')
                }
            ],
        }
    }
} else {
    config = {
        entry: {
            demo1: './src/feature-demos/demo1/index.js',
            demo2: './src/feature-demos/demo2/index.js',
            demo3: './src/feature-demos/demo3/index.js',
            demo4: './src/feature-demos/demo4/index.js',
            demo5: './src/feature-demos/demo5/index.js',
            twoBallsSwing: './src/loading-demos/twoBallsSwing/index.js',
            baiduMobile: './src/loading-demos/baidu-mobile/index.js',
            swiperTab: './src/complex-demos/swiper-tab/index.js',
        },
        output: {
            path: './dist',
            filename: '[name].js'
        },
        devtool: args.env === 'dist' ? '' : 'eval-source-map',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loader: extractCSS.extract({
                        fallbackLoader: "style-loader",
                        loader: [
                            {
                                loader: 'css-loader',
                                query: {
                                    minimize: true
                                }
                            },
                            {
                                loader: 'postcss-loader'
                            }
                        ]
                    }),
                    // include: path.resolve(__dirname, 'src')
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ],
                    include: path.resolve(__dirname, 'src')
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: './feature-demos/demo1/index.html',
                template: './src/feature-demos/demo1/index.html',
                chunks: ['demo1']
            }),
            new HtmlWebpackPlugin({
                filename: './feature-demos/demo2/index.html',
                template: './src/feature-demos/demo2/index.html',
                chunks: ['demo2']
            }),
            new HtmlWebpackPlugin({
                filename: './feature-demos/demo3/index.html',
                template: './src/feature-demos/demo3/index.html',
                chunks: ['demo3']
            }),
            new HtmlWebpackPlugin({
                filename: './feature-demos/demo4/index.html',
                template: './src/feature-demos/demo4/index.html',
                chunks: ['demo4']
            }),
            new HtmlWebpackPlugin({
                filename: './feature-demos/demo5/index.html',
                template: './src/feature-demos/demo5/index.html',
                chunks: ['demo5']
            }),
            new HtmlWebpackPlugin({
                filename: './loading-demos/twoBallsSwing/index.html',
                template: './src/loading-demos/twoBallsSwing/index.html',
                chunks: ['twoBallsSwing']
            }),
            new HtmlWebpackPlugin({
                filename: './loading-demos/baidu-mobile/index.html',
                template: './src/loading-demos/baidu-mobile/index.html',
                chunks: ['baiduMobile']
            }),
            new HtmlWebpackPlugin({
                filename: './complex-demos/swiper-tab/index.html',
                template: './src/complex-demos/swiper-tab/index.html',
                chunks: ['swiperTab']
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: function () {
                        return [
                            require('autoprefixer')({
                                browsers: ['> 1%', 'last 3 versions', 'iOS >= 6', 'android 4']
                            })
                        ];
                    },
                }
            }),
            extractCSS
        ],
        devServer: {
            contentBase: './src',
            port: 9000
        },
    }
}


module.exports = config