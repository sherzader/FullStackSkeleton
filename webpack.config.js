module.exports = {
    entry: "./client.js",
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
