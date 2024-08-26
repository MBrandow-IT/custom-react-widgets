const path = require('path');

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: {
    PHCWidgets: path.resolve(__dirname, 'src/PHCWidgets.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    library: '[name]',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // React and ReactDOM will be bundled with PHCWidgets
};