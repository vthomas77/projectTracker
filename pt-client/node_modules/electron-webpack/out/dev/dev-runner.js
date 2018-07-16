"use strict";

function _bluebirdLst() {
  const data = _interopRequireWildcard(require("bluebird-lst"));

  _bluebirdLst = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
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

require("source-map-support/register");

function _webpack() {
  const data = _interopRequireDefault(require("webpack"));

  _webpack = function () {
    return data;
  };

  return data;
}

function _HmrServer() {
  const data = require("../electron-main-hmr/HmrServer");

  _HmrServer = function () {
    return data;
  };

  return data;
}

function _main() {
  const data = require("../main");

  _main = function () {
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

function _devUtil() {
  const data = require("./devUtil");

  _devUtil = function () {
    return data;
  };

  return data;
}

function _WebpackDevServerManager() {
  const data = require("./WebpackDevServerManager");

  _WebpackDevServerManager = function () {
    return data;
  };

  return data;
}

// do not remove main.js to allow IDE to keep breakpoints
let emptyMainOutput = (() => {
  var _ref = (0, _bluebirdLst().coroutine)(function* () {
    const outDir = path.join(projectDir, "dist", "main");
    const files = yield (0, _util().orNullIfFileNotExist)((0, _fsExtraP().readdir)(outDir));

    if (files == null) {
      return;
    }

    yield _bluebirdLst().default.map(files.filter(it => !it.startsWith(".") && it !== "main.js"), it => (0, _fsExtraP().remove)(outDir + path.sep + it));
  });

  return function emptyMainOutput() {
    return _ref.apply(this, arguments);
  };
})();

let main = (() => {
  var _ref2 = (0, _bluebirdLst().coroutine)(function* () {
    const devRunner = new DevRunner();
    yield devRunner.start();
  });

  return function main() {
    return _ref2.apply(this, arguments);
  };
})();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const projectDir = process.cwd();
let socketPath = null;

const debug = require("debug")("electron-webpack");

class DevRunner {
  start() {
    var _this = this;

    return (0, _bluebirdLst().coroutine)(function* () {
      const wdsHost = "localhost";
      const wdsPort = yield (0, _util().getFreePort)(wdsHost, 9080);
      const env = Object.assign({}, (0, _devUtil().getCommonEnv)(), {
        ELECTRON_WEBPACK_WDS_HOST: wdsHost,
        ELECTRON_WEBPACK_WDS_PORT: wdsPort
      });
      const hmrServer = new (_HmrServer().HmrServer)();
      yield Promise.all([(0, _WebpackDevServerManager().startRenderer)(projectDir, env), hmrServer.listen().then(it => {
        socketPath = it;
      }), emptyMainOutput().then(() => _this.startMainCompilation(hmrServer))]);
      hmrServer.ipc.on("error", error => {
        (0, _devUtil().logError)("Main", error);
      });
      const electronArgs = process.env.ELECTRON_ARGS;
      const args = electronArgs != null && electronArgs.length > 0 ? JSON.parse(electronArgs) : [`--inspect=${yield (0, _util().getFreePort)("127.0.0.1", 5858)}`];
      args.push(path.join(projectDir, "dist/main/main.js")); // Pass remaining arguments to the application. Remove 3 instead of 2, to remove the `dev` argument as well.

      args.push(...process.argv.slice(3)); // we should start only when both start and main are started

      startElectron(args, env);
    })();
  }

  startMainCompilation(hmrServer) {
    return (0, _bluebirdLst().coroutine)(function* () {
      const mainConfig = yield (0, _main().configure)("main", {
        production: false,
        autoClean: false,
        forkTsCheckerLogger: {
          info: () => {// ignore
          },
          warn: message => {
            (0, _devUtil().logProcess)("Main", message, _chalk().default.yellow);
          },
          error: message => {
            (0, _devUtil().logProcess)("Main", message, _chalk().default.red);
          }
        }
      });
      yield new Promise((resolve, reject) => {
        const compiler = (0, _webpack().default)(mainConfig);
        const printCompilingMessage = new (_devUtil().DelayedFunction)(() => {
          (0, _devUtil().logProcess)("Main", "Compiling...", _chalk().default.yellow);
        });
        compiler.hooks.compile.tap("electron-webpack-dev-runner", () => {
          hmrServer.beforeCompile();
          printCompilingMessage.schedule();
        });
        let watcher = compiler.watch({}, (error, stats) => {
          printCompilingMessage.cancel();

          if (watcher == null) {
            return;
          }

          if (error != null) {
            if (reject == null) {
              (0, _devUtil().logError)("Main", error);
            } else {
              reject(error);
              reject = null;
            }

            return;
          }

          (0, _devUtil().logProcess)("Main", stats.toString({
            colors: true
          }), _chalk().default.yellow);

          if (resolve != null) {
            resolve();
            resolve = null;
            return;
          }

          hmrServer.built(stats);
        });

        require("async-exit-hook")(callback => {
          debug(`async-exit-hook: ${callback == null}`);
          const w = watcher;

          if (w == null) {
            return;
          }

          watcher = null;
          w.close(() => callback());
        });
      });
    })();
  }

}

main().catch(error => {
  console.error(error);
});

function startElectron(electronArgs, env) {
  const electronProcess = (0, _child_process().spawn)(require("electron").toString(), electronArgs, {
    env: Object.assign({}, env, {
      ELECTRON_HMR_SOCKET_PATH: socketPath
    })
  }); // required on windows

  require("async-exit-hook")(() => {
    electronProcess.kill("SIGINT");
  });

  let queuedData = null;
  electronProcess.stdout.on("data", data => {
    data = data.toString(); // do not print the only line - doesn't make sense

    if (data.trim() === "[HMR] Updated modules:") {
      queuedData = data;
      return;
    }

    if (queuedData != null) {
      data = queuedData + data;
      queuedData = null;
    }

    (0, _devUtil().logProcess)("Electron", data, _chalk().default.blue);
  });
  (0, _devUtil().logProcessErrorOutput)("Electron", electronProcess);
  electronProcess.on("close", exitCode => {
    debug(`Electron exited with exit code ${exitCode}`);

    if (exitCode === 100) {
      setImmediate(() => {
        startElectron(electronArgs, env);
      });
    } else {
      process.emit("message", "shutdown");
    }
  });
} 
//# sourceMappingURL=dev-runner.js.map