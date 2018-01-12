const path = require("path");

module.exports = {
    entry: ["babel-polyfill", path.join(__dirname, "./src/client.js")],
    output: {
        filename: "./static/bundle.js",
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /.js/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["babel-preset-env", "react"],
                },
            },
        ],
    },
};
