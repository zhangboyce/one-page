'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(path.resolve(__dirname), './pages/index.js'),
    output: {
        path: path.resolve(__dirname, './dist/pages'),
        filename: 'index.js',
        libraryTarget: 'umd2'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            plugins: ['transform-decorators-legacy' ],
                            presets: ['es2015', 'stage-0']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/'
                        },
                    },
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.less', '.css']
    },
    plugins: [
        new ExtractTextPlugin("index.css"),
        new CopyPlugin([
            {
                from: 'pages/**/*.html',
                to: __dirname + '/dist'
            },
            {
                from: 'pages/**/images/**',
                to: __dirname + '/dist'
            },
            {
                from: 'public/**/*',
                to: __dirname + '/dist',
            }
        ])
    ],
};