const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const path = require('path');
const rules = require('./rules');
const { minimizer } = require('./minimizer');

module.exports = {
  mode: 'production',
  entry: {
    'index': path.join(__dirname, '../src'),
    'eventBus': path.join(__dirname, '../src/eventBus'),
    'palette': path.join(__dirname, '../src/palette'),
    'utils.cookie':  path.join(__dirname, '../src/utils/cookie'),
    'utils.uid': path.join(__dirname, '../src/utils/uid'),
    'utils.delay': path.join(__dirname, '../src/utils/delay'),
    'utils.isDefined': path.join(__dirname, '../src/utils/isDefined'),
    'utils.base64': path.join(__dirname, '../src/utils/base64'),
    'utils.isJSON': path.join(__dirname, '../src/utils/isJSON'),
    'utils.string': path.join(__dirname, '../src/utils/string'),
  },
  output: {
    globalObject: 'this',
    library: {
      name: 'dncore',
      type: 'umd',
    },
    filename: (pathData) => {
      if (pathData.chunk.name === 'index') {
        return '[name].js';
      }
      if (pathData.chunk.name.startsWith('utils')) {
        return `utils/${pathData.chunk.name.replace(/^utils\./, '')}.js`;
      }
      return '[name].js';
    },
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  externals: {
    'vue': 'vue',
    '@/eventBus': './eventBus.js',
    '@/palette': './palette.js',
    '@/utils/cookie': './utils/cookie.js',
    '@/utils/uid': './utils/uid.js',
    '@/utils/delay': './utils/delay.js',
    '@/utils/isDefined': './utils/isDefined.js',
    '@/utils/base64': './utils/base64.js',
    '@/utils/isJSON': './utils/isJSON.js',
    '@/utils/string': './utils/string.js',
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
