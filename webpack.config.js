const path = require('path');
const webpack = require('webpack');
module.exports = {
  devtool: 'eval',
  entry:  __dirname + "/app/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module:{
    loaders:[
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: path.join(__dirname, 'node_modules'),
        loader: 'babel'
      },
      {
       test: /\.scss$/,
       loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    contentBase:"./public",
    color:true,
    inline:true,
    hot: true
  }
}
