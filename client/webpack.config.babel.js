import path from 'path';
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
    entry: PATHS.CLT_INDEX,
    // le point de sortie vers lequel sera compilé tout le code
    // de notre projet
    output: {
        path: PATHS.DEV_DIR,
        filename: 'bundle.js'
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
        // on configure les plugins utiles à notre projet
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            title: 'FAW'
        }),
    ],
};
