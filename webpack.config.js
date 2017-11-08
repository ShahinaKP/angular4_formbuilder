var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSASS = new ExtractTextPlugin('./src/app/components/formbuilder/lib/formbuilder/styles/sass/form-builder.scss');

module.exports = {
  entry: {
    'app': './src/main.ts',
    'polyfills': [
      'core-js/es6',
      'core-js/es7/reflect',
      'zone.js/dist/zone'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.component.ts$/, loader: 'ts-loader!angular2-template-loader'},
      {test: /\.ts$/, exclude: /\.component.ts$/, loader: 'ts-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
      {
            test: /\.(scss|css)$/,
            use: [{
                loader: 'to-string-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader',
            }]
        },
        {
          test: /\.sass$/i,
          use: extractSASS.extract([ 'css-loader', 'sass-loader' ])
        },
      {test: /\.(png|jpg|jpeg|gif|svg|ico)$/, loader: 'file-loader'}
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.html', '.css', '.scss']
  },
  
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills'
    }),
    new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)@angular/,
        __dirname // location of your src
    ),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
      }
    }),
    new CopyWebpackPlugin([{
      from: './src/app/assets',
      to: './assets',
      copyUnmodified: true,
      force: true
    }]),
    extractSASS

  ],  
    devServer: {
        port: 4086,
        host: 'localhost',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
    }
};