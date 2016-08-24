const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
const isProduction = function () {
  return process.env.NODE_ENV === 'production';
};
const filename = "[name]-[hash].js";
let plugins = [
  new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
  }),
  extractCSS,
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'js/commons.js',
  }),
  new HtmlWebpackPlugin({
    path: 'public',
    filename: 'index.html',
    template: 'app/src/assets/body.ejs'
  }),
  new HtmlWebpackPlugin({
    path: 'public',
    filename: 'info.html',
    chunks: ['commons','info'],
    template: 'app/src/assets/body.ejs'
  })
];
if(isProduction()){
  plugins.push(
   new webpack.optimize.UglifyJsPlugin({
     test: /\.js$/,
     compress: {
       warnings: false
     },
   })
 );
}else{
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = {
  devtool: "source-map",
  entry:  {
    'main' : __dirname + "/app/main.js",
    'info' : __dirname + "/app/info.js"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: filename
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
       loader: extractCSS.extract(["css-loader?sourceMap", "sass"])
      },
      { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  },
  plugins:plugins,
  devServer:{
    contentBase:"./public",
    color:true,
    inline:true,
    hot: true,
    noInfo:true
  }
}
