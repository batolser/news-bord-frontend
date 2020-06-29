const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки

module.exports = {
  entry: {
    main: './src/js/main.js',
    saved_articles: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
  },
  module: {
    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      use: { loader: 'babel-loader' }, // весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/, // исключает папку node_modules
    },
    {
      test: /\.css$/i,
      use: [
        isDev ? { loader: 'style-loader' } : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
        'css-loader',
        'postcss-loader',

      ],
    }, // пример настройки плагина image-webpack-loader
    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      use: [
        'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
        {
          loader: 'image-webpack-loader',
          options: {},
        },
      ],
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]',
    },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }), // подключите плагин после MiniCssExtractPlugin
    new HtmlWebpackPlugin({
    // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/main.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'main.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new HtmlWebpackPlugin({
      // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
