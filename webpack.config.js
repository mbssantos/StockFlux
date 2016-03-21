module.exports = {
    entry: './src/app.js',
    output: {
        // filename: "bundle.js"
        path: '/public',
        filename: './app.js',
        publicPath: "public/"
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                presets: ['es2015']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    }
}
