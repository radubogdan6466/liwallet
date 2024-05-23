var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'fe/src/') + '/index.jsx',
    output: {
        path: path.resolve(__dirname, 'public'), // <<== THIS
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './app',
        port: 3333
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: [ "node_modules" ],
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
}