const webpack = require("webpack");

const mode = process.env.MODE || 'build'

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    },
    mangle: false
  })
]

module.exports = {
  entry: `./main.js`,
  bail: true,
  target: 'web',
  watch: mode === 'dev',
  devtool: 'source-map',
  debug: true,
  eslint: {
    configFile: 'cfg/.eslintrc'
  },
  output: {
    path: './dist',
    filename: `myloSDK.js`,
    library: 'Mylo'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: require("./babel.js")
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader"
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  plugins: mode === 'build' ? plugins : null,
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
