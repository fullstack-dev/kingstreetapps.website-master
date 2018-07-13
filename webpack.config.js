const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: './src/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    open: true
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'babel-preset-env',
              'babel-preset-react',
              'babel-preset-stage-0',
            ],
            plugins: [
              'babel-plugin-transform-runtime',
              'lodash'
            ],
          }
        }
      },
      {
        test: /\.(scss)$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                postcss: {
                  plugins: [require('autoprefixer')]
                }
              }
            },
          ]
        })
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        exclude: [
          /node_modules/,
          /src.assets.icons/,
          /src.public/
        ],
        use: 'url-loader'
      },
      {
        // Extract assets in public folder outside the bundles
        test: /src.public.*\.(png|ico|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=[path][name].[ext]&context=./src/public'
      },
      {
        // create SVG sprites for svg icon system
        test: /src.assets.icons.*\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader?symbolId=[path][name]',
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false},
                {removeUselessStrokeAndFill: {stroke: false}}
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader']
        }),
        include: [
          /node_modules[\\\/]react-clock[\\\/].*/,
          /node_modules[\\\/]slick-carousel[\\\/].*/
        ]
      },
      {
        // Inline everything smaller than 10KB
        // Make external files for everything bigger than that
        test: /node_modules[\\\/]slick-carousel[\\\/].*\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new SpriteLoaderPlugin(),
    new LodashModuleReplacementPlugin({
      'collections': true,
      'shorthands': true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    })
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.jsx', '.json'],
    enforceExtension: false
  }
};
