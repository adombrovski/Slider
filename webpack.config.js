
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devServer: {
        port: 3000,
        contentBase: "./build"
    },
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./index.html'),
        })
    ],
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".tsx", ".ts"]
    }
}