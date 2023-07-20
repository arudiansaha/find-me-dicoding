const { merge } = require('webpack-merge');
const WorkWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WorkWebpackPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
      swDest: './sw.bundle.js',
      include: [
        '**/*.js',
        '**/*.html',
        '**/*.css',
        '**/*.json',
        '**/*.svg',
        '**/*.png',
        '**/*.gif',
        '**/*.txt',
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
});
