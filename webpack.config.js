var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: __dirname + '/app/main.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
        exclude: path.resolve(__dirname, "node_modules"),
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', "stage-2", 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'scss']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ],
  devServer: {
    port: 3000,
    inline: true
  }
}