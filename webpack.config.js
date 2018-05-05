const path = require('path');

module.exports = [{
    entry: './src/sdb-client.ts',
    mode: 'production',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        path: path.resolve(__dirname, 'built'),
        filename: 'sdb-client-bundle.js'
    }
}];