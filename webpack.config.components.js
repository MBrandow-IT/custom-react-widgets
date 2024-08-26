const path = require('path');
const fs = require('fs');

function getComponentEntries() {
  const componentsDir = path.resolve(__dirname, 'src/components');
  const componentFiles = fs.readdirSync(componentsDir);
  const entries = {};

  componentFiles.forEach((file) => {
    const fileName = path.basename(file, '.jsx');
    entries[fileName] = path.resolve(componentsDir, file);
  });

  return entries;
}

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: getComponentEntries(),
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
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
