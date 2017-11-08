import path from 'path';

const PATHS = {
    CLT_INDEX : path.join(__dirname, '..', 'app', 'index.js'),
    DEV_DIR : path.join(__dirname, '..', 'app', 'releases', 'dev'),
    DIST_DIR : path.join(__dirname, '..', 'app', 'releases', 'dist')
};

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
        extensions: ['', '.js', '.jsx']
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
        ],
    },

    plugins: [
        // on configure les plugins utiles à notre projet
    ]
},
