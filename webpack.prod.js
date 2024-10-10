const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production', 
  output: {
    publicPath: '/https://github.com/AndresDev28/to-do-App',
},
});