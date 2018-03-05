function buildProductionConfig() {
  const merge = require('webpack-merge');
  const OfflinePlugin = require('offline-plugin');
  const CompressionPlugin = require('compression-webpack-plugin');

  const { PurifyPlugin } = require('@angular-devkit/build-optimizer');
  const { EnvironmentPlugin } = require('webpack');
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

  const commonConfig = require('./webpack.config.common');

  return merge.smart(commonConfig, {
    mode: 'production',

    entry: {
      main: ['./src/main.ts', './src/service-worker.ts'],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: '@angular-devkit/build-optimizer/webpack-loader',
          options: {
            sourceMap: false,
          },
        },
      ],
    },

    plugins: [
      new PurifyPlugin(),

      new EnvironmentPlugin({
        NODE_ENV: 'production',
        DEBUG: false,
      }),

      new OfflinePlugin({
        autoUpdate: 5 * 60 * 1000,
        AppCache: false,
        externals: ['/', 'home'], // add paths to cache offline here (usually /home or similar)
        excludes: ['_redirects'], // for netlify if used
        ServiceWorker: {
          events: true,
          minify: false,
        },
      }),

      new CompressionPlugin({
        regExp: /\.css$|\.html$|\.js$|\.map$/,
        threshold: 2 * 1024,
      }),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'report/bundle.html',
        openAnalyzer: false,
      }),
    ],
  });
}

module.exports = buildProductionConfig();
