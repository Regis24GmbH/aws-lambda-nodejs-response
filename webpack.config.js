'use strict';

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'aws-lambda-nodejs-response.js',
    path: path.resolve(__dirname, 'dist')
  }
};
