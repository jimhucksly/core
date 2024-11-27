const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const path = require('path');
const rules = require('./rules');
const { minimizer } = require('./minimizer');

module.exports = {
  mode: 'production',
  entry: {
    'index': path.join(__dirname, '../src'),
    'eventBus': path.join(__dirname, '../src/utils/eventBus'),
    'cookies': path.join(__dirname, '../src/utils/cookies'),
    'uid': path.join(__dirname, '../src/utils/uid'),
    'delay': path.join(__dirname, '../src/utils/delay'),
    'isDefined': path.join(__dirname, '../src/utils/isDefined'),

  },
  output: {
    globalObject: 'this',
    library: {
      name: 'dncore',
      type: 'umd',
    },
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  externals: {
    'vue': 'vue',
    '@/utils/eventBus': './eventBus.js',
    '@/utils/cookies': './cookies.js',
    '@/utils/uid': './uid.js',
    '@/utils/delay': './delay.js',
    '@/utils/isDefined': './isDefined.js'
  },
  resolve: {
    symlinks: true,
    modules: [path.join(__dirname, '../'), 'node_modules'],
    extensions: ['.*', '.ts', '.js', '.html', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm-bundler.js',
      '@': 'src'
    },
  },
  module: {
    rules,
  },
  optimization: {
    minimize: false,
    minimizer: [
      minimizer
    ]
  },
  plugins: [
    new DefinePlugin({
      '$DEV': false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/index.d.ts',
          to: './index.d.ts'
        },
        {
          from: 'src/types',
          to: './types'
        },
      ]
    })
  ]
}
