const path = require('path');

module.exports = {
  entry: './src/watch-me-load.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
