const path = require('path');
const webpack = require('webpack');
const globalVars = require('./src/css/var.js');

module.exports = {
  pages: {
    index: {
      entry: 'src/app.js',
      template: 'index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  css: {
    loaderOptions: {
      less: {
        globalVars
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        model: path.resolve(__dirname, 'src/js/model/'),
        js: path.resolve(__dirname, 'src/js/'),
        components: path.resolve(__dirname, 'src/components/')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Utils: [path.resolve(__dirname, 'src/js/common/utils'), 'default'],
        Manba: 'manba',
        HeyUI: 'heyui',
        Model: 'js-model',
        G: 'hey-global',
        log: 'hey-log',
        R: [path.resolve(__dirname, 'src/js/common/request'), 'default']
      })
    ]
  },
  devServer: {
    proxy: {
      // '/api': {
      //   //proxy address
      //   target: 'http://192.168.1.195:8089',
      //   changeOrigin: true
      // }
    },
    historyApiFallback: true
  }
};
