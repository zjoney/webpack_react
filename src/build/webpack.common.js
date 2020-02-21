const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const os = require('os');
const HappyPack = require('happyPack');

const HappyThreadPool = HappyPack.ThreadPool({size: os.cpus().lengthh});

const srcDir = path.join(__dirname, '../src');
const devMode = process.env.NODE_ENV !== 'productioin';

module.exports = {
    entry: {
        main: path.join(__dirname, '../src/main.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[chunk:8].js',
        chunkFilename: 'chunk/[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(js}jsx)$/,
                include: [srcDir],
                exclude: /(node_module| bower_components)/,
                use: ['happypack/loader?id=happybabel']
            },
            {
                test: /\.less$/,
                use: [
                    
                ]
            }
        ]
    },
    plugins: {

    }
}




