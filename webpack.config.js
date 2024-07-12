const path = require('path');

module.exports = {
  entry: './src/sched.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      fs: false
    }
  },
  module: {
    rules: [
        {
          test: /\.hbs$/,
          use: [{
            loader: "handlebars-loader",
            options: {
              helperDirs: path.resolve(__dirname, "./src/helpers")
            }
          }]
        }
      ]
  },
};