var webpack = require('webpack');
var path = require('path');
module.exports = {
   entry:{
    fzgl: './js/src/fzgl.js',
    zjkgl: './js/src/zjkgl.js',
    wpgl: './js/src/wpgl.js',
    "wpgl-jieguo": './js/src/wpgl-jieguo.js',
    "wpgl-fenpei": './js/src/wpgl-fenpei.js',
    pjzbgl: './js/src/pjzbgl.js',
    zjfzgl: './js/src/zjfzgl.js',
    kcfzgl: './js/src/kcfzgl.js',

    gzzd:'./js/src/gzzd.js',
    guizhang_home:'./js/src/guizhang_home.js',
    "vendor-zq-gzzd": ['react', 'react-dom']
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
            names: ['react-zq-gzzd']
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
