import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CreateFileWebpack from "create-file-webpack";
import ExtraWatchWebpackPlugin from "extra-watch-webpack-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";
import InlineEnvironmentVariablesPlugin from "inline-environment-variables-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { ResolverPlugin } from "tsconfig-paths-webpack-plugin/lib/plugin";
import webpack, { Compiler } from "webpack";
import WebpackPwaManifest from "webpack-pwa-manifest";

import { fs } from "../fs";
import { projectPath } from "../projectPath";

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const ModuleDependencyWarning = require("webpack/lib/ModuleDependencyWarning");

const babelConfig = {
	presets: [
		[
			"@babel/env",
			{
				targets: {
					ie: "11",
				},
				corejs: 3,
				useBuiltIns: "usage",
			},
		],
	],
	plugins: [
		["@babel/plugin-proposal-decorators", { legacy: true }],
		["@babel/proposal-class-properties", { loose: true }],
		"@babel/proposal-object-rest-spread",
		"babel-plugin-graphql-tag",
	],
};

class IgnoreNotFoundExportPlugin {
	apply(compiler: Compiler) {
		const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/;
		function doneHook(stats: {
			compilation: { warnings: Array<typeof ModuleDependencyWarning | { message: string }> };
		}) {
			stats.compilation.warnings = stats.compilation.warnings.filter(function (warn) {
				return !(warn instanceof ModuleDependencyWarning && messageRegExp.test(warn.message));
			});
		}
		if (compiler.hooks) compiler.hooks.done.tap("IgnoreNotFoundExportPlugin", doneHook);
		else compiler.plugin("done", doneHook);
	}
}

export const webpackConfigFactory = (
	env: "development" | "production" | "none",
	isStorybook: boolean = false
): webpack.Configuration => {
	const outputPath = path.resolve(projectPath, "dist");
	const isProd = env === "production";
	const minimizers = [];
	const CI = process.env.CI === "true";
	const publicPath = isProd ? process.env.PUBLIC_URL || "/" : "/";

	if (isProd)
		minimizers.push(
			new TerserPlugin({
				sourceMap: true,
				extractComments: "all",
				terserOptions: {
					compress: {
						drop_console: true,
					},
				},
			})
		);

	const plugins = [
		isProd && !CI && new BundleAnalyzerPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.EnvironmentPlugin(process.env),
		new ExtraWatchWebpackPlugin({
			dirs: [path.resolve(__dirname, "templates")],
		}),
		new HtmlWebPackPlugin({
			templateContent: async () => {
				return (await fs.readFile(path.resolve(__dirname, "templates/index.html"), "utf-8"))
					.replace(
						'<style id="replace-style"></style>',
						`<style>${await fs.readFile(path.resolve(__dirname, "templates/index.css"), "utf-8")}</style>`
					)
					.replace(
						'<script id="replace-script"></script>',
						`<script>${await fs.readFile(path.resolve(__dirname, "templates/index.js"), "utf-8")}</script>`
					);
			},
			filename: "./index.html",
			favicon: "src/assets/favicon.png",
		}),
		new WebpackPwaManifest({
			name: "OpenFING",
			theme_color: "#2E77BD",
			ios: true,
			background_color: "white",
			fingerprints: true,
			inject: true,
			icons: [
				{
					src: path.join(projectPath, "src", "assets", "logo.png"),
					sizes: [96, 128, 192, 256, 384, 512, 1024], // multiple sizes
					destination: "static/icons",
				},
			],
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(false),
		new InlineEnvironmentVariablesPlugin(),
		isProd &&
			new CreateFileWebpack({
				path: outputPath,
				fileName: ".htaccess",
				content: `RewriteEngine On
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
RewriteRule ^ /var/www/html/OpenFING-FW${publicPath !== "/" && publicPath !== "./" ? publicPath : ""}/index.html
`,
			}),
		new IgnoreNotFoundExportPlugin(),
	].filter(Boolean);

	if (isProd) plugins.push(new CleanWebpackPlugin());

	const resolve: { extensions: string[]; plugins: ResolverPlugin[]; alias?: Record<string, string> } = {
		extensions: [".mjs", ".ts", ".tsx", ".js", ".json"],
		plugins: [new TsconfigPathsPlugin()],
	};

	if (isStorybook)
		resolve.alias = {
			src: path.resolve(projectPath, "../src"),
		};

	return {
		mode: env,
		entry: path.resolve(projectPath, "src", "index.tsx"),
		output: {
			path: outputPath,
			filename: isProd ? path.join("static", "js", "[hash].bundle.js") : "main.js",
			publicPath,
			pathinfo: false,
		},
		module: {
			rules: [
				{
					test: /\.(graphql|gql)$/,
					exclude: /node_modules/,
					loader: "graphql-tag/loader",
				},
				{
					test: /\.ts(x?)$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								cacheDirectory: true,
								...babelConfig,
							},
						},
						{
							loader: "ts-loader",
							options: {
								transpileOnly: true,
								onlyCompileBundledFiles: true,
								experimentalWatchApi: true,
							},
						},
					],
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: "html-loader",
						},
					],
				},
				{
					test: /\.(svg|jpg|jpeg|ttf)$/,
					use: {
						loader: "url-loader",
						options: isStorybook
							? {}
							: {
									limit: 1024,
									publicPath: publicPath + (publicPath.endsWith("/") ? "" : "/") + "static/assets",
									outputPath: "static/assets",
							  },
					},
				},
			],
		},
		resolve,
		plugins,
		devServer: {
			publicPath: "/",
			historyApiFallback: true,
			host: "0.0.0.0",
		},
		devtool: isProd ? undefined : "source-map",
		optimization: {
			minimizer: minimizers,
		},
		stats: {
			warningsFilter: /export .* was not found in/,
		},
	};
};
