import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from './webpack.config.babel';

const PATHS = {
    CLT_INDEX : path.join(__dirname, 'app', 'index.js'),
    DEV_DIR : path.join(__dirname, 'releases', 'dev'),
    DIST_DIR : path.join(__dirname, 'releases', 'dist')
};

// Déclaration du port local :
const PORT = 8080;

// Création d'une instance d'express :
const app = express();

const compiler = webpack(config);

// Attach the dev middleware to the compiler :
const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
});

// Attach the dev middleware to the server :
app.use(middleware);

// Attach the hot middleware to the compiler & the server :
app.use(webpackHotMiddleware(compiler));

// Serving the files on the dev folder :
app.use(express.static(PATHS.DEV_DIR));

// Send index.html when the user access the web :
app.get('*', function (req, res) {
    res.sendFile(path.join(PATHS.DEV_DIR, 'index.html'));
});

// Express doit écouter le port défini :
app.listen(PORT);
