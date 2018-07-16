"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDllAssets = exports.configureDll = void 0;

function _bluebirdLst() {
  const data = require("bluebird-lst");

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

function _webpack() {
  const data = require("webpack");

  _webpack = function () {
    return data;
  };

  return data;
}

function _util() {
  const data = require("../util");

  _util = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

let configureDll = (() => {
  var _ref = (0, _bluebirdLst().coroutine)(function* (configurator) {
    let dllManifest = null;
    const projectDir = configurator.projectDir;

    if (configurator.type === "renderer-dll") {
      const dll = configurator.electronWebpackConfiguration.renderer.dll;

      if (dll == null) {
        throw new Error(`renderer-dll requires DLL configuration`);
      }

      configurator.config.entry = Array.isArray(dll) ? {
        vendor: dll
      } : dll;
      dllManifest = path.join(configurator.commonDistDirectory, configurator.type, "manifest.json");
      configurator.plugins.push(new (_webpack().DllPlugin)({
        name: "[name]",
        path: dllManifest,
        context: projectDir
      }));
      const output = configurator.config.output; // leave as default "var"

      delete output.libraryTarget;
      output.library = "[name]";
    } else if (configurator.type === "renderer") {
      const dllDir = path.join(configurator.commonDistDirectory, "renderer-dll");
      const dirStat = yield (0, _util().statOrNull)(dllDir);

      if (dirStat == null || !dirStat.isDirectory()) {
        configurator.debug("No DLL directory");
        return null;
      }

      configurator.debug(`DLL directory: ${dllDir}`);
      configurator.plugins.push(new (_webpack().DllReferencePlugin)({
        context: projectDir,
        manifest: yield (0, _fsExtraP().readJson)(path.join(dllDir, "manifest.json"))
      }));
    }

    return dllManifest;
  });

  return function configureDll(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.configureDll = configureDll;

let getDllAssets = (() => {
  var _ref2 = (0, _bluebirdLst().coroutine)(function* (dllDir, configurator) {
    if (configurator.electronWebpackConfiguration.renderer.dll == null) {
      return [];
    }

    const files = yield (0, _util().orNullIfFileNotExist)((0, _fsExtraP().readdir)(dllDir));
    return files == null ? [] : files.filter(it => it.endsWith(".js") || it.endsWith(".css")).sort();
  });

  return function getDllAssets(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})(); exports.getDllAssets = getDllAssets;
//# sourceMappingURL=dll.js.map