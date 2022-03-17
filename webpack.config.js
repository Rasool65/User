const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackplugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.Node_ENV === 'development';

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackplugin(),
    ];
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
    minify: {
      collapseWhitespace: !isDev,
    },
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: filename('css'),
  }),
  new TSLintPlugin({
    files: ['./src/**/*.ts', './src/**/*.tsx'],
  }),
];

// if (!isDev) {

//   plugins.push(
//     new CopyPlugin({
//       patterns: [
//         { from: path.resolve(__dirname, 'Help'), to: 'Help' },
//         { from: path.resolve(__dirname, 'web.config'), to: '[name].[ext]' },
//       ],
//     })
//   )
// }

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.tsx',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.png', '.json', '.svg'],
    enforceExtension: false,
    mainFiles: ['index'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
      // 'highcharts-xrange-series': path.resolve(__dirname, 'node_modules/highcharts/modules/xrange.src')
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4800,
    hot: isDev,
    historyApiFallback: true,
  },
  devtool: isDev ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif|xlsx)$/,
        use: [
          {
            loader: 'file-loader',
            options: !isDev
              ? {
                  name: '[name].[ext]',
                  publicPath: '/images',
                  outputPath: 'images',
                }
              : {},
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: !isDev
              ? {
                  name: '[name].[ext]',
                  publicPath: 'fonts',
                  outputPath: 'fonts',
                }
              : {},
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  plugins: plugins,
};
