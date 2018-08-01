const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const NgrockWebpackPlugin = require('ngrock-webpack-plugin');

module.exports = function(env) {
    const config = {
        entry: "./src/index.tsx",
        output: {
            filename: 'custom-component.js',
            path: path.resolve(__dirname, 'build')
        },
        devtool: 'inline-source-map',
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'tslint-loader',
                            options: {
                                fix: true
                            }
                        }
                    ]
                },
                { 
                    test: /\.tsx?$/, 
                    loader: "awesome-typescript-loader" 
                },
                { 
                    test: /\.js$/, 
                    enforce: "pre", 
                    loader: "source-map-loader" 
                },
                { 
                    test:/\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    }) 
                }
            ]
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
        plugins: [
            new WriteFilePlugin(),
            new ExtractTextPlugin("custom-component.css"),
        ],
    }

    if (!env.production) {
       
        config.devServer = {
            contentBase: './build'
        };
        config.plugins.push(new NgrockWebpackPlugin());
        config.mode = 'development';
    }
    else
        config.mode = 'production';

    return config;
};