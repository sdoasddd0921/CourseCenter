var webpack = require('webpack');
module.exports = {
  entry: {
    tongji_kczystj: './js/src/tongji_kczystj.js',
    tongJi: './js/src/tongJi.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: './js/pages/',
    filename: "[name].bundle.js",
    publicPath: 'http://localhost:8080/js/pages/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['react']
    })
  ],
  // resolve: {
  //   alias: {
  //     'react': __dirname + "/node_modules/react/dist/react.min.js",
  //     'react-dom': __dirname + "/node_modules/react-dom/dist/react-dom.min.js"
  //   }
  // },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, ],
    postLoaders: [{
      test: /\.js$/,
      loaders: ['es3ify-loader'],
    }, ],
  },
};
