
const path = require('path');
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.js'
  },
  mode: "development",
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: 'dist',
    overlay: true,
    hot: true,
    // watch: true,
    watchOptions: {
    aggregateTimeout: 1000,
    poll: 5000,
    ignored: '/node_modules/'
    },
    stats: {
      colors: true
    }
  },
  module: {
  rules: [
    {
      test: /\.js$/,
      use: [{loader: "babel-loader"}],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use:  [{loader: 'style-loader'}, {loader: 'css-loader'}]
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: "html-loader"
        }
      ]
    },
    {
      test: /\.(jpg|gif|jpeg|png)$/,
      use: [{loader: 'file-loader', options: {name: 'images/[name.][ext]'}}]
    }
  ]
 },
 plugins: [
   new webpack.HotModuleReplacementPlugin(),

   new HTMLWebpackPlugin({
     template: "./src/index.html"
   })
 ]
};
