var webpack = require('webpack');
module.exports = {
   entry:{
    gzzd:'./js/pages/gzzd.js',
    guizhang_home:'./js/pages/guizhang_home.js',
    courseJianjie:'./js/pages/courseJianjie.js',
    courseManagement:'./js/pages/courseManagement.js',
    courseShow:'./js/pages/courseShow.js',
    homeCourse:'./js/pages/homeCourse.js',
    teachingTeam:'./js/pages/teachingTeam.js',
    team_show:'./js/pages/team_show.js',


    vendor: ['react', 'react-dom']
  },
  output:{
      path:'./js/pages/',
      filename:"[name].bundle.js",
      publicPath: 'http://localhost:8080/js/pages/'
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
