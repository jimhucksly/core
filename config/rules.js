module.exports = [
  {
    test: /\.ts$/,
    exclude: /node_modules|\.(spec|d)\.ts$/,
    use: {
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true,
        happyPackMode: false,
      }
    }
  }
];
