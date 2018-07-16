"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebpackRemoveOldAssetsPlugin = exports.walk = exports.CONCURRENCY = exports.MAX_FILE_REQUESTS = void 0;

function _bluebirdLst() {
  const data = _interopRequireWildcard(require("bluebird-lst"));

  _bluebirdLst = function () {
    return data;
  };

  return data;
}

function _fsExtraP() {
  const data = require("fs-extra-p");

  _fsExtraP = function () {
    return data;
  };

  return data;
}

var path = _interopRequireWildcard(require("path"));

function _util() {
  const data = require("../util");

  _util = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const MAX_FILE_REQUESTS = 8;
exports.MAX_FILE_REQUESTS = MAX_FILE_REQUESTS;
const CONCURRENCY = {
  concurrency: MAX_FILE_REQUESTS
};
exports.CONCURRENCY = CONCURRENCY;

const debug = require("debug")("electron-webpack:clean");

let walk = (() => {
  var _ref = (0, _bluebirdLst().coroutine)(function* (initialDirPath, filter) {
    const result = [];
    const queue = [initialDirPath];
    let addDirToResult = false;

    while (queue.length > 0) {
      const dirPath = queue.pop();
      const childNames = yield (0, _util().orNullIfFileNotExist)((0, _fsExtraP().readdir)(dirPath));

      if (childNames == null) {
        continue;
      }

      if (addDirToResult) {
        result.push(dirPath);
      } else {
        addDirToResult = true;
      }

      childNames.sort();
      const dirs = []; // our handler is async, but we should add sorted files, so, we add file to result not in the mapper, but after map

      const sortedFilePaths = yield _bluebirdLst().default.map(childNames, name => {
        const filePath = dirPath + path.sep + name;
        return (0, _fsExtraP().lstat)(filePath).then(stat => {
          if (filter != null && !filter(filePath, stat)) {
            return null;
          }

          if (stat.isDirectory()) {
            dirs.push(name);
            return null;
          } else {
            return filePath;
          }
        });
      }, CONCURRENCY);

      for (const child of sortedFilePaths) {
        if (child != null) {
          result.push(child);
        }
      }

      dirs.sort();

      for (const child of dirs) {
        queue.push(dirPath + path.sep + child);
      }
    }

    return result;
  });

  return function walk(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.walk = walk;

class WebpackRemoveOldAssetsPlugin {
  constructor(dllManifest) {
    this.dllManifest = dllManifest;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync("WebpackRemoveOldAssetsPlugin", (compilation, callback) => {
      const newlyCreatedAssets = compilation.assets;
      const outDir = compiler.options.output.path;
      walk(outDir, (file, stat) => {
        // dll plugin
        if (file === this.dllManifest) {
          return false;
        }

        const relativePath = file.substring(outDir.length + 1);

        if (stat.isFile()) {
          return newlyCreatedAssets[relativePath] == null;
        } else if (stat.isDirectory()) {
          for (const p of Object.keys(newlyCreatedAssets)) {
            if (p.length > relativePath.length && (p[relativePath.length] === "/" || p[relativePath.length] === "\\") && p.startsWith(relativePath)) {
              return false;
            }
          }

          return true;
        }

        return false;
      }).then(it => {
        if (it.length === 0) {
          return null;
        }

        if (debug.enabled) {
          debug(`Remove outdated files:\n  ${it.join("\n  ")}`);
        }

        return _bluebirdLst().default.map(it, it => (0, _fsExtraP().remove)(it), CONCURRENCY);
      }).then(() => callback()).catch(callback);
    });
  }

} exports.WebpackRemoveOldAssetsPlugin = WebpackRemoveOldAssetsPlugin;
//# sourceMappingURL=WebpackRemoveOldAssetsPlugin.js.map