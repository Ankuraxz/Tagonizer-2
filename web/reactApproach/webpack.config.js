const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new CopyWebpackPlugin([
      { from: "src/manifest.json", to: "[name].[ext]" },
      { from: "src/background.js", to: "[name].[ext]" },
      { from: "src/content.js", to: "[name].[ext]" },
      { from: "src/*.png", to: "[name].[ext]" },
    ]),
  ],
};
