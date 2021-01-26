'use strict'
const path = require('path')


module.exports = {
  // Compile ./browser/index.js
  entry: './browser/index.js',
  output: {
    path: __dirname,
    //write the output to ./public/bundle.js
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    // What file extensions will webpack look
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        // Use babel for files that end in js or jsx.
        test: /jsx?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
}
