"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orNullIfFileNotExist = orNullIfFileNotExist;
exports.orIfFileNotExist = orIfFileNotExist;
exports.getFirstExistingFile = getFirstExistingFile;
exports.getFreePort = getFreePort;
exports.statOrNull = void 0;

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

function _net() {
  const data = require("net");

  _net = function () {
    return data;
  };

  return data;
}

var path = _interopRequireWildcard(require("path"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

let statOrNull = (() => {
  var _ref = (0, _bluebirdLst().coroutine)(function* (file) {
    return orNullIfFileNotExist((0, _fsExtraP().stat)(file));
  });

  return function statOrNull(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.statOrNull = statOrNull;

function orNullIfFileNotExist(promise) {
  return orIfFileNotExist(promise, null);
}

function orIfFileNotExist(promise, fallbackValue) {
  return promise.catch(e => {
    if (e.code === "ENOENT" || e.code === "ENOTDIR") {
      return fallbackValue;
    }

    throw e;
  });
}

function getFirstExistingFile(names, rootDir) {
  return _bluebirdLst().default.filter(names.map(it => rootDir == null ? it : path.join(rootDir, it)), it => statOrNull(it).then(it => it != null)).then(it => it.length > 0 ? it[0] : null);
}

function getFreePort(defaultHost, defaultPort) {
  return new Promise((resolve, reject) => {
    const server = (0, _net().createServer)({
      pauseOnConnect: true
    });
    server.addListener("listening", () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });

    function doListen(port) {
      server.listen({
        host: defaultHost,
        port,
        backlog: 1,
        exclusive: true
      });
    }

    server.on("error", e => {
      if (e.code === "EADDRINUSE") {
        server.close(() => doListen(0));
      } else {
        reject(e);
      }
    });
    doListen(defaultPort);
  });
} 
//# sourceMappingURL=util.js.map