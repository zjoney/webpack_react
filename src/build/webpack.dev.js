const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
     mode: 'development',
     // 开发环境配置
     devServer: {
         port: 6203,
         hot: true,
         open: true,
         historyApiFallback: true,
         compress: true,
         proxy: {
             '/testApi': {
                 target: 'https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template',
                 changeOrigin: true,
                 secure: false,
                 pathRewrite: {'^/testApi': ''},
             }
         }
     },
     plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
     devtool: 'eval-source-map'
})

