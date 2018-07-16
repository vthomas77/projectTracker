"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureFileLoader = configureFileLoader;
exports.BaseTarget = void 0;

function _bluebirdLst() {
  const data = require("bluebird-lst");

  _bluebirdLst = function () {
    return data;
  };

  return data;
}

var path = _interopRequireWildcard(require("path"));

function _webpack() {
  const data = require("webpack");

  _webpack = function () {
    return data;
  };

  return data;
}

function _dll() {
  const data = require("../configurators/dll");

  _dll = function () {
    return data;
  };

  return data;
}

function _eslint() {
  const data = require("../configurators/eslint");

  _eslint = function () {
    return data;
  };

  return data;
}

function _js() {
  const data = require("../configurators/js");

  _js = function () {
    return data;
  };

  return data;
}

function _WatchMatchPlugin() {
  const data = require("../plugins/WatchMatchPlugin");

  _WatchMatchPlugin = function () {
    return data;
  };

  return data;
}

function _WebpackRemoveOldAssetsPlugin() {
  const data = require("../plugins/WebpackRemoveOldAssetsPlugin");

  _WebpackRemoveOldAssetsPlugin = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class BaseTarget {
  configureRules(configurator) {
    const rules = configurator.rules;
    const babelLoader = (0, _js().createBabelLoader)(configurator);

    if (configurator.type !== "main" && configurator.hasDependency("iview")) {
      rules.push({
        test: /iview.src.*?js$/,
        use: babelLoader
      });
    }

    rules.push({
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: babelLoader
    }, {
      test: /\.node$/,
      use: "node-loader"
    });

    if (configurator.hasDevDependency("nunjucks-loader")) {
      rules.push({
        test: /\.(njk|nunjucks)$/,
        loader: "nunjucks-loader"
      });
    }

    (0, _eslint().configureEslint)(configurator);
  }

  configurePlugins(configurator) {
    return (0, _bluebirdLst().coroutine)(function* () {
      const plugins = configurator.plugins;
      const dllManifest = yield (0, _dll().configureDll)(configurator);
      const mode = configurator.isProduction ? "production" : "development";
      let optimization = configurator.config.optimization;

      if (optimization == null) {
        optimization = {};
        configurator.config.optimization = optimization;
      }

      optimization.nodeEnv = mode;
      configurator.config.mode = mode;

      if (configurator.isProduction) {
        if (configurator.env.minify !== false) {
          const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

          plugins.push(new UglifyJsPlugin({
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
              compress: {
                ecma: 7
              }
            }
          }));
        }

        optimization.minimize = true;
        plugins.push(new (_webpack().LoaderOptionsPlugin)({
          minimize: true
        })); // do not use ModuleConcatenationPlugin for HMR
        // https://github.com/webpack/webpack-dev-server/issues/949

        optimization.concatenateModules = true;
      } else {
        configureDevelopmentPlugins(configurator);
      }

      if (configurator.env.autoClean !== false) {
        plugins.push(new (_WebpackRemoveOldAssetsPlugin().WebpackRemoveOldAssetsPlugin)(dllManifest));
      }

      optimization.noEmitOnErrors = true;
      const additionalEnvironmentVariables = Object.keys(process.env).filter(it => it.startsWith("ELECTRON_WEBPACK_"));

      if (additionalEnvironmentVariables.length > 0) {
        plugins.push(new (_webpack().EnvironmentPlugin)(additionalEnvironmentVariables));
      }
    })();
  }

}

exports.BaseTarget = BaseTarget;

function configureFileLoader(prefix, limit = 10 * 1024) {
  return {
    limit,
    name: `${prefix}/[name]--[folder].[ext]`
  };
}

function isAncestor(file, dir) {
  return file.length > dir.length && file[dir.length] === path.sep && file.startsWith(dir);
}

function configureDevelopmentPlugins(configurator) {
  const plugins = configurator.plugins;
  configurator.config.optimization.namedModules = true;
  plugins.push(new (_webpack().DefinePlugin)({
    __static: `"${path.join(configurator.projectDir, "static").replace(/\\/g, "\\\\")}"`
  }));
  plugins.push(new (_webpack().HotModuleReplacementPlugin)());

  if (configurator.hasDevDependency("webpack-build-notifier")) {
    const WebpackNotifierPlugin = require("webpack-build-notifier");

    plugins.push(new WebpackNotifierPlugin({
      title: `Webpack - ${configurator.type}`,
      suppressSuccess: "initial",
      sound: false
    }));
  }

  if (configurator.hasDevDependency("webpack-notifier")) {
    const WebpackNotifierPlugin = require("webpack-notifier");

    plugins.push(new WebpackNotifierPlugin({
      title: `Webpack - ${configurator.type}`
    }));
  } // watch common code


  let commonSourceDir = configurator.electronWebpackConfiguration.commonSourceDirectory;

  if (commonSourceDir == null) {
    // not src/common, because it is convenient to just put some code into src to use it
    commonSourceDir = path.join(configurator.projectDir, "src");
  }

  const alienSourceDir = configurator.getSourceDirectory(configurator.type === "main" ? "renderer" : "main");
  configurator.plugins.push(new (_WatchMatchPlugin().WatchFilterPlugin)(file => {
    return file === commonSourceDir || isAncestor(file, commonSourceDir) && alienSourceDir != null && !file.startsWith(alienSourceDir);
  }, require("debug")(`electron-webpack:watch-${configurator.type}`)));
} 
//# sourceMappingURL=BaseTarget.js.map