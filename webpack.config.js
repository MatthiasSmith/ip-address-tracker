const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const nodeEnv = env.NODE_ENV === 'development' ? 'development' : 'production';
  const config = {
    mode: nodeEnv,
    entry: {
      app: './src/index.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: nodeEnv === 'development' ? 'inline-source-map' : false,
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: 'Frontend Mentor | IP Address Tracker',
        template: './src/index.html',
        favicon: './public/images/favicon-32x32.png',
      }),
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
          test: /\.(png|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    optimization: {
      minimize: nodeEnv === 'development' ? false : true,
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
          commons: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
          },
        },
      },
    },
  };

  if (nodeEnv === 'development') {
    config.plugins.push(new Dotenv());
  } else if (nodeEnv === 'production') {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          MB_API: JSON.stringify(process.env.MB_API),
          IP_GL_API: JSON.stringify(process.env.IP_GL_API),
        },
      })
    );
  }

  return config;
};
