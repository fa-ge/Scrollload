const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const find = require('find')
const camelcase = require('camelcase')

const args = require('minimist')(process.argv.slice(2))
const extractCSS = new ExtractTextPlugin('[name].css')

let config
if (args.env === 'lib') {
    config = {
        entry: {
            Scrollload: './src/Scrollload.js',
        },
        output: {
            path: path.resolve(__dirname, './lib'),
            filename: '[name].js',
            library: '[name].js',
            libraryTarget: 'umd',
        },
        module: {
            rules: [
                {
                    test: /loading\.css$/,
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                minimize: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                    include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/localscrollfix')],
                },
            ],
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: function() {
                        return [
                            require('autoprefixer')({
                                browsers: ['> 1%', 'last 3 versions', 'iOS >= 6', 'android 4'],
                            }),
                        ]
                    },
                },
            }),
            new webpack.optimize.UglifyJsPlugin(),
        ],
    }
    const filePaths = find.fileSync('loading.js', './src/loading-demos')
    filePaths.forEach((filePath, index) => {
        config.entry[camelcase(filePath.split('/')[2])] = `./${filePath}`
    })
} else {
    config = {
        entry: {},
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js',
        },
        devtool: args.env === 'dist' ? '' : 'eval-source-map',
        module: {
            rules: [
                {
                    test: /loading\.css$/,
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                minimize: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                },
                {
                    test(path) {
                        return /\.css$/.test(path) && path.indexOf('loading.css') === -1
                    },
                    use: extractCSS.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                query: {
                                    minimize: true,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                            },
                        ],
                    }),
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                    include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/localscrollfix')],
                },
            ],
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: function() {
                        return [
                            require('autoprefixer')({
                                browsers: ['> 1%', 'last 3 versions', 'iOS >= 6', 'android 4'],
                            }),
                        ]
                    },
                },
            }),
            extractCSS,
        ],
        devServer: {
            contentBase: './src',
            port: 9000,
            disableHostCheck: true,
        },
    }
    const filePaths = find.fileSync('index.js', './src')
    filePaths.forEach((filePath, index) => {
        config.entry[`out${index}`] = `./${filePath}`
        config.plugins.push(
            new HtmlWebpackPlugin({
                filename: filePath.replace(/js$/, 'html').replace('src/', ''),
                template: filePath.replace(/js$/, 'html'),
                chunks: [`out${index}`],
            })
        )
    })
}

module.exports = config
