const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/entry.ts',
  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/models/*.glb',
          to({ context, absoluteFilename }) {
            return "models/[name][ext]";
          }
        }
      ]
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    open: true,
    static: {
      directory: path.resolve(__dirname, 'dist')
    }
  }
};
