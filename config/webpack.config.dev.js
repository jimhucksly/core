const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const path = require('path');
const rules = require('./rules');
const devServer = require('./server');

process.on('uncaughtException', (err) => {
  console.log(err);
});

module.exports = {
  mode: 'development',
  entry: {
    'main': './src/dev.ts',
  },
  module: {
    rules,
  },
  resolve: {
    symlinks: true,
    modules: [path.join(__dirname, '../'), 'node_modules'],
    extensions: ['.*', '.ts', '.js', '.html', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm-bundler.js',
      '@': 'src',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    }),
    new DefinePlugin({
      '$DEV': true,
      '__VUE_OPTIONS_API__': true,
      '__VUE_PROD_DEVTOOLS__': false,
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
    }),
  ],
  devServer,
}
