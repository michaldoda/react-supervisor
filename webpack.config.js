const path = require("path")

module.exports = {
    watch: true,
    mode: "development",
    entry: "./dev/src/index.js",
    output: {
        path: path.join(__dirname, "./dev/output"),
        filename: "dev.js"
    },
    devServer: {
        port: 3000,
        watchContentBase: true,
        stats: "errors-only",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]
    }
}