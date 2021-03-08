const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  return {
    mode: env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: {
      app: './src/index.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: env.NODE_ENV === 'development' ? 'inline-source-map' : false,
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: 'Frontend Mentor | IP Address Tracker',
        template: './src/index.html',
      }),
      new Dotenv(),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|gif)$/i,
          use: 'file-loader',
        },
        {
          test: /\.svg$/,
          use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
        },
      ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    optimization: {
      minimize: env.NODE_ENV === 'development' ? false : true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
          commons: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
          },
        },
      },
    },
  };
};
