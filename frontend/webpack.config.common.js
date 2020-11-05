const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      '@layouts': path.resolve(__dirname, './layouts'),
      '@components': path.resolve(__dirname, './components'),
      '@pages': path.resolve(__dirname, './pages'),
      '@utils': path.resolve(__dirname, './utils'),
      '@static': path.resolve(__dirname, './static'),
      '@services': path.resolve(__dirname, './services'),
      '@plugins': path.resolve(__dirname, './plugins'),
    },
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: ['./index.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
  },
  // set loaders
  module: {
    rules: [
      // babel loader
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  // set plugins
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Issue Tracker',
      scriptLoading: 'defer',
      template: './static/index.html',
    }),
  ],
};
