const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: 'babel-loader',
        options: {
          compact: true
        }
      }
    ]
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  externals: [nodeExternals({importType: 'umd'})],
  entry: path.resolve(__dirname, './src'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'mapbox-gl-animations.web.js',
    library: 'mapbox-gl-animations',
    libraryTarget: 'umd'
  }
};
