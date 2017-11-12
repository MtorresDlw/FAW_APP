import path from 'path';
import webpack from 'webpack';
import stylelint from 'stylelint';
import postcssReporter from 'postcss-reporter';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import mqpacker from 'css-mqpacker';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PATHS = {
    CLT_INDEX : path.join(__dirname, 'app', 'index.js'),
    DEV_DIR : path.join(__dirname, 'releases', 'dev'),
    DIST_DIR : path.join(__dirname, 'releases', 'dist')
};

const processors = [
    stylelint(),
    precss(),
    autoprefixer(),
    mqpacker(),
    postcssReporter(),
];

module.exports = {
    // le point d'entrée de notre application :
    entry: [
        'webpack-hot-middleware/client',
        PATHS.CLT_INDEX,
    ],
    // le point de sortie vers lequel sera compilé tout le code
    // de notre projet
    output: {
        path: PATHS.DEV_DIR,
        filename: 'bundle.js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        loaders: [
            // on déclare tous les loaders qui vont compiler nos fichiers
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory=true',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader?cacheDirectory=true',
                exclude: /node_modules/
            },
            {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(jpg|gif|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            /*{
                test: /\.png$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    mimetype: 'image/png',
                    name: '[path][name].[ext]'
                },
            },*/
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => processors,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            title: 'FAW'
        }),
    ],
};
