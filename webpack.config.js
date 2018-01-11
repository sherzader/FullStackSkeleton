module.exports = {
    entry: ["babel-polyfill", "./client.js"],
    output: {
        filename: "bundle.js",
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
