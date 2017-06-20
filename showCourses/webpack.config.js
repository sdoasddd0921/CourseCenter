var webpack = require('webpack');
module.exports = {
   entry:{
		homeCourse:'./js/pages/homeCourse.js',
    vendor: ['react', 'react-dom']
  },
  output:{
      path:'./js/pages/',
      filename:"[name].wp.js",
      publicPath: 'http://localhost:8080/js/pages'
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
