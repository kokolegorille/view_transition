const path = require("path")
// const Webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

// Dev server
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (_env, options) => {
    const devMode = options.mode !== "production"
    const mode = options.mode ? options.mode : "none"

    return {
        // stats: "minimal",
        mode,
        devtool: devMode ? "eval-cheap-module-source-map" : undefined,
        optimization: {
            // UNCOMMENT FOR BUILDING VENDOR SPLIT
            // splitChunks: {
            //     cacheGroups: {
            //         vendor: {
            //             test: /react|react-dom|react-icons|react-18next|i18next|marked|phoenix|uuid|webvtt-parser|jwplayer/,
            //             chunks: "initial",
            //             name: "vendor",
            //             enforce: true
            //         }
            //     }
            // },
            minimizer: [
                new TerserPlugin({}),
                new CssMinimizerPlugin({})
            ]
        },
        // resolve jwplayer for easy import
        resolve: {
            alias: {
                jwplayer: path.resolve(__dirname, "./vendor/jwplayer-8.26.4/jwplayer")
            }
        },
        // UNCOMMENT TO USE EXTERNAL JWPLAYER
        // Using externals disallow cacheable.
        // https://stackoverflow.com/questions/35170397/webpack-external-not-cacheable
        // ./src/index.js + 276 modules 4.77 MiB [not cacheable] [built] [code generated]
        //
        // externals: {
        //     jwplayer: "jwplayer"
        // },
        entry: {
            app: "./src/index.js",
            // UNCOMMENT IF YOU WANT A Customcss pipeline
            // clientStyles: "./src/css/clientStyles.scss"
        },
        output: {
            filename: "js/[name].js",
            path: path.resolve(__dirname, "./dist"),
            // Use "" when relative, "/" when absolute
            publicPath: "",
            clean: true
        },
        module: {
            rules: [
                // Load javascript

                // UNCOMMENT to use babel-loader to compile Javascript
                // {
                //     test: /\.js$/,
                //     exclude: /node_modules/,
                //     use: {
                //         loader: "babel-loader"
                //     }
                // },

                // UNCOMMENT to use esbuild to compile JavaScript & TypeScript
                {
                    // Match `.js`, `.jsx`, `.ts` or `.tsx` files
                    test: /\.[jt]sx?$/,
                    loader: "esbuild-loader",
                    options: {
                        loader: "jsx",
                        // JavaScript version to compile to
                        target: "es2015",
                        jsx: "automatic",
                    }
                },

                // Load stylesheets
                {
                    test: /\.[s]?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                  
                // Load images

                // Extract images in a folder
                {
                    test: /\.(png|svg|jpe?g|gif)(\?.*$|$)/,
                    type: "asset/resource",
                    generator: {
                        filename: "./images/[contenthash][ext][query]"
                    }
                },

                // // Inline images for better portability
                // {
                //     test: /\.(png|svg|jpe?g|gif)(\?.*$|$)/,
                //     use: ["base64-inline-loader"],
                //     type: "javascript/auto"
                // },
                // Load fonts

                // Extract fonts in a folder
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "./fonts/[contenthash][ext][query]"
                    }
                }

                // // Inline fonts for better portability
                // {
                //     test: /\.(woff|woff2|eot|ttf|otf)$/,
                //     use: ["base64-inline-loader"],
                //     type: "javascript/auto"
                // }
            ]
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: "./static", to: path.join(__dirname, "dist") }
                ]
            }),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/index.html",
                favicon: "./static/favicon.png",
                inject: "body",
                // inject: false,
            }),
            new MiniCssExtractPlugin({ filename: "css/[name].css" }),
            // new Webpack.HotModuleReplacementPlugin(),
        ],
        // contentBase has been deprecated in favor of static
        // https://stackoverflow.com/questions/67926476/webpack-dev-server-config-contentbase-not-working-in-latest-version
        devServer: {
            static: path.join(__dirname, "dist"),
            historyApiFallback: true,
            compress: true,
            open: true,
            // port: 8080,
        }
    }
}