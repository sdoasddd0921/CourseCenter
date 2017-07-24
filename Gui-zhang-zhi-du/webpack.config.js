var webpack = require('webpack');
var path = require('path');
module.exports = {
   entry:{
    zjkgl: './js/src/zjkgl.js',
    gzzd:'./js/src/gzzd.js',
    guizhang_home:'./js/src/guizhang_home.js',
    wpgl: './js/src/wpgl.js',
    vendor: ['react', 'react-dom']
  },
  output:{
      path: path.resolve(__dirname),
      filename:"js/pages/[name].bundle.js",
      publicPath: 'http://localhost:8080/'
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    stats: 'errors-only'
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
            names: ['react']
        })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['es3ify-loader'],
      },
    ],
  },
};
