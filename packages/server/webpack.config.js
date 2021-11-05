const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const WebPackIgnorePlugin =
  {
    checkResource: function(resource) {
      const lazyImports =
        [
          "@nestjs/microservices",
          "@nestjs/microservices/microservices-module",
          "cache-manager",
          "class-transformer",
          "class-validator",
          "fastify-static",
          "@nestjs/platform-socket.io"
        ];

      if (!lazyImports.includes(resource)) {
        return false;
      }

      try {
        require.resolve(resource);
      } catch (err) {
        return true;
      }

      return false;
    }
  };

module.exports = function(options, webpack) {
  console.log('WEBPACK', options, webpack);
  return {
    ...options,
    entry: ["webpack/hot/poll?100", options.entry],
    externals: [
      nodeExternals({
        allowlist: ["webpack/hot/poll?100"]
      })
    ],
    plugins: [
      ...options.plugins,
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/]
      }),
      new webpack.HotModuleReplacementPlugin(),
    //  new CleanWebpackPlugin(),
      new webpack.IgnorePlugin(WebPackIgnorePlugin),
    ]
  };
};
