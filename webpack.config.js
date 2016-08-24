const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-[contenthash].css');
const isProduction = function () {
  return process.env.NODE_ENV === 'production';
};
const filename = "[name]-[hash].js";
const devtool = isProduction()? 'eval' : 'source-map';
const APP_PATH = path.resolve(__dirname, 'app');
const TEM_PATH = path.resolve(APP_PATH, 'src/assets');
let plugins = [
  new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
  }),
  extractCSS,
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'js/commons.js',
  }),
  new HtmlWebpackPlugin({
    path: 'public',
    filename: 'index.html',
    template: path.resolve(TEM_PATH, 'index.ejs')
  }),
  new HtmlWebpackPlugin({
    path: 'public',
    filename: 'info.html',
    chunks: ['commons','info'],
    title: 'I console log info',
    template: path.resolve(TEM_PATH, 'info.ejs')
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
  devtool: devtool,
  entry:  {
    'main' : path.resolve(APP_PATH, "main.js"),
    'info' : path.resolve(APP_PATH, "info.js")
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
