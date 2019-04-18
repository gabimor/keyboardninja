exports.id = "main";
exports.modules = {

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ "babel-runtime/core-js/get-iterator");
/* harmony import */ var babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var connect_flash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! connect-flash */ "connect-flash");
/* harmony import */ var connect_flash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(connect_flash__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! express-session */ "express-session");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! compression */ "compression");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _server_cache__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./server/cache */ "./src/server/cache.js");
/* harmony import */ var _client_Layout__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./client/Layout */ "./src/client/Layout.js");
/* harmony import */ var _client_DataContext__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./client/DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _server_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./server/page */ "./src/server/page.js");
/* harmony import */ var _server_auth__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./server/auth */ "./src/server/auth.js");
/* harmony import */ var _server_api__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./server/api */ "./src/server/api.js");
/* harmony import */ var _server_models__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./server/models */ "./src/server/models.js");





var _this = undefined,
    _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\server.js";

var defaultHandler = function () {
  var _ref2 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res, next) {
    var appCategories, dataContext;
    return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _server_cache__WEBPACK_IMPORTED_MODULE_15__["getAppCategories"]();

          case 3:
            appCategories = _context2.sent;
            dataContext = {
              appCategories: appCategories,
              user: req.user
            };


            sendPage(req, res, dataContext);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);

            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 8]]);
  }));

  return function defaultHandler(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/* eslint-disable import/first */
 // eslint-disable-line no-unused-vars











var RedisStore = __webpack_require__(/*! connect-redis */ "connect-redis")(express_session__WEBPACK_IMPORTED_MODULE_11___default.a);

dotenv__WEBPACK_IMPORTED_MODULE_14___default.a.config();









var assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");

var app = express__WEBPACK_IMPORTED_MODULE_12___default()();

var router = express__WEBPACK_IMPORTED_MODULE_12___default.a.Router();

app.disable("x-powered-by");

app.use(express_session__WEBPACK_IMPORTED_MODULE_11___default()({
  store: new RedisStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 300000, secure: false }
}));

app.use(compression__WEBPACK_IMPORTED_MODULE_13___default()());
app.use(body_parser__WEBPACK_IMPORTED_MODULE_7___default.a.json());
app.use(body_parser__WEBPACK_IMPORTED_MODULE_7___default.a.urlencoded({ extended: false }));
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_8___default()());
app.use(passport__WEBPACK_IMPORTED_MODULE_9___default.a.initialize());
app.use(connect_flash__WEBPACK_IMPORTED_MODULE_10___default()());
app.use(passport__WEBPACK_IMPORTED_MODULE_9___default.a.session());
app.use("/api", _server_api__WEBPACK_IMPORTED_MODULE_20__["default"]);
app.use("/", router);

app.use(express__WEBPACK_IMPORTED_MODULE_12___default.a.static("C:\\MyStull\\Code\\keyboardninja\\public"));

app.get("/404", defaultHandler);

app.get("/:name", function () {
  var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res, next) {
    var appsHash, foundApp, appId, _app, os, firstTimeMessage, userShortcuts, _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, shortcutId, appCategories, dataContext;

    return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _server_cache__WEBPACK_IMPORTED_MODULE_15__["getAppsHash"]();

          case 3:
            appsHash = _context.sent;
            foundApp = appsHash.find(function (e) {
              return e.name === req.params.name;
            });

            if (foundApp) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.redirect("/404"));

          case 7:
            appId = foundApp.id;
            _context.next = 10;
            return _server_cache__WEBPACK_IMPORTED_MODULE_15__["getApp"](appId);

          case 10:
            _app = _context.sent;
            os = req.cookies.os;
            firstTimeMessage = !!os;


            console.log(firstTimeMessage);
            if (!os) {
              os = req.headers["user-agent"].toLowerCase().includes("win") ? "win" : "mac";
            }
            // if app doesn't support the detected os, switch os to the one that's supported
            if (!_app.oss.includes(os)) {
              os = _app.oss[0];
            }

            if (!req.query.h) {
              _context.next = 49;
              break;
            }

            _context.prev = 17;
            _context.next = 20;
            return _server_models__WEBPACK_IMPORTED_MODULE_21__["UserShortcut"].findById(req.query.h);

          case 20:
            userShortcuts = _context.sent;


            // TODO: replace with production solution
            _app = JSON.parse(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2___default()(_app));

            if (!(userShortcuts && userShortcuts.appId.toString() === appId)) {
              _context.next = 43;
              break;
            }

            _loop = function _loop(shortcutId) {
              _app.shortcuts.find(function (e) {
                return e._id.toString() === shortcutId.toString();
              }).isPinned = true;
            };

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 27;

            for (_iterator = babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1___default()(userShortcuts.shortcuts); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              shortcutId = _step.value;

              _loop(shortcutId);
            }
            _context.next = 35;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](27);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 35:
            _context.prev = 35;
            _context.prev = 36;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 38:
            _context.prev = 38;

            if (!_didIteratorError) {
              _context.next = 41;
              break;
            }

            throw _iteratorError;

          case 41:
            return _context.finish(38);

          case 42:
            return _context.finish(35);

          case 43:
            _context.next = 49;
            break;

          case 45:
            _context.prev = 45;
            _context.t1 = _context["catch"](17);

            console.log(req.path);
            console.log(_context.t1.toString());
            // res.redirect(req.path)

          case 49:
            _context.next = 51;
            return _server_cache__WEBPACK_IMPORTED_MODULE_15__["getAppCategories"]();

          case 51:
            appCategories = _context.sent;
            dataContext = { app: _app, os: os, appCategories: appCategories };


            sendPage(req, res, dataContext);
            _context.next = 59;
            break;

          case 56:
            _context.prev = 56;
            _context.t2 = _context["catch"](0);

            next(_context.t2);

          case 59:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this, [[0, 56], [17, 45], [27, 31, 35, 43], [36,, 38, 42]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

app.get("/", defaultHandler);

app.use(function errorHandler(err, req, res, next) {
  res.status(500);
  res.send(err.toString() + err.stack);
});

var getTemplate = function getTemplate(url, dataContext) {
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(
    _client_DataContext__WEBPACK_IMPORTED_MODULE_17__["default"].Provider,
    { value: dataContext, __source: {
        fileName: _jsxFileName,
        lineNumber: 150
      }
    },
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(
      react_router_dom__WEBPACK_IMPORTED_MODULE_5__["StaticRouter"],
      { context: {}, location: url, __source: {
          fileName: _jsxFileName,
          lineNumber: 151
        }
      },
      react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_client_Layout__WEBPACK_IMPORTED_MODULE_16__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        }
      })
    )
  );
};

var sendPage = function sendPage(req, res, dataContext) {
  var cacheKey = req.originalUrl + "-" + dataContext.os;

  if (!req.user) {
    var cachePage = _server_cache__WEBPACK_IMPORTED_MODULE_15__["get"](cacheKey);
    if (!cachePage) {
      var markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_6__["renderToString"])(getTemplate(req.url, dataContext));
      cachePage = Object(_server_page__WEBPACK_IMPORTED_MODULE_18__["page"])(markup, undefined, assets, dataContext);
      _server_cache__WEBPACK_IMPORTED_MODULE_15__["set"](cacheKey, cachePage);
    }
    res.status(200).send(cachePage);
  } else {
    res.write(Object(_server_page__WEBPACK_IMPORTED_MODULE_18__["pageStart"])(undefined, assets, dataContext));
    var stream = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_6__["renderToNodeStream"])(getTemplate(req.url, dataContext));
    stream.pipe(res, { end: "false" });
    stream.on("end", function () {
      res.end(Object(_server_page__WEBPACK_IMPORTED_MODULE_18__["pageEnd"])());
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ })

};
//# sourceMappingURL=main.804d7d6652782da86e7f.hot-update.js.map