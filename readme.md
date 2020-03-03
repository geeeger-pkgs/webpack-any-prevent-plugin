# Usage

```js
const { AnyPreventPlugin } = require('@geeeger/webpack-any-prevent-plugin');

const webpackConfig = {
  mode: 'production',
  bail: true,
  devtool: false,
  entry: {
    app: resolveApp('src/h5-components/app.scss'),
  },
  output: {
    path: resolveApp('lib/css'),
    filename: '[name].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: false,
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
  },
  resolve: {},
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: imageInlineSizeLimit,
              name: 'assets/[name].[ext]',
            },
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: false,
              },
              'sass-loader'
            ),
            sideEffects: true,
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [sassRegex, /.js$/],
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new AnyPreventPlugin({
      exportExculde: [/.js$/],
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
  ],
  performance: false,
}

// => dist lib/css/app.css and main.js will not landing
```