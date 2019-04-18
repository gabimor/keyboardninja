exports.id = "main";
exports.modules = {

/***/ "./src/client/helpers/osSelect.js":
/*!****************************************!*\
  !*** ./src/client/helpers/osSelect.js ***!
  \****************************************/
/*! exports provided: init, getSelectedOS, setSelectedOS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedOS", function() { return getSelectedOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedOS", function() { return setSelectedOS; });
function init() {
  if (!document.cookie.includes("os=")) {
    setSelectedOS(getClientOS());
  }
}

function getSelectedOS() {
  var selectedOS = getCookie("os");
  if (!selectedOS) {
    selectedOS = getClientOS();
  }

  return selectedOS;
}

function setSelectedOS(os) {
  document.cookie = "os=" + os + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

function getClientOS() {
  var isWin = navigator.platform.toLowerCase().includes("win");
  return isWin ? "win" : "mac";
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

/***/ }),

/***/ "./src/client/pages/App.js":
/*!*********************************!*\
  !*** ./src/client/pages/App.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ "babel-runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ "babel-runtime/helpers/slicedToArray");
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_FirstTimeMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/FirstTimeMessage */ "./src/client/pages/app/FirstTimeMessage.js");
/* harmony import */ var _app_ShortcutList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app/ShortcutList */ "./src/client/pages/app/ShortcutList.js");
/* harmony import */ var _app_Controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app/Controls */ "./src/client/pages/app/Controls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers */ "./src/client/helpers/index.js");
/* harmony import */ var _helpers_osSelect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers/osSelect */ "./src/client/helpers/osSelect.js");


var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\App.js";

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  columns: 2;\n  column-gap: 30px;\n\n  @media (max-width: 1122px) {\n    columns: 1;\n  }\n"], ["\n  columns: 2;\n  column-gap: 30px;\n\n  @media (max-width: 1122px) {\n    columns: 1;\n  }\n"]);

 // eslint-disable-line no-unused-vars










var App = function App() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
      app = _useContext.app,
      os = _useContext.os;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(!document.cookie),
      _useState2 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      messageVisible = _useState2[0],
      setMessageVisible = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    _helpers_osSelect__WEBPACK_IMPORTED_MODULE_9__["init"]();
  }, []);

  var encodedName = Object(_helpers__WEBPACK_IMPORTED_MODULE_8__["encodeAppName"])(app.name);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
    "div",
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    },
    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_app_Controls__WEBPACK_IMPORTED_MODULE_7__["default"], { icon: encodedName + ".png", name: app.name, __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      }
    }),
    messageVisible && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_app_FirstTimeMessage__WEBPACK_IMPORTED_MODULE_5__["default"], { onDismiss: function onDismiss() {
        return setMessageVisible(false);
      }, __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      }
    }),
    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
      ResultsContainer,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      },
      app.sections.map(function (section) {
        var shortcuts = app.shortcuts.filter(function (e) {
          return e.sectionId.toString() === section._id.toString() && e[os];
        });

        if (shortcuts.length === 0) return undefined;

        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_app_ShortcutList__WEBPACK_IMPORTED_MODULE_6__["default"], {
          key: section._id,
          shortcuts: shortcuts,
          title: section.name,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 35
          }
        });
      })
    )
  );
};

/* harmony default export */ __webpack_exports__["default"] = (App);

var ResultsContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject);

/***/ }),

/***/ "./src/client/pages/app/Controls.js":
/*!******************************************!*\
  !*** ./src/client/pages/app/Controls.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ "babel-runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ "babel-runtime/helpers/slicedToArray");
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _OSSelect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./OSSelect */ "./src/client/pages/app/OSSelect.js");
/* harmony import */ var _GetLink__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./GetLink */ "./src/client/pages/app/GetLink.js");
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../helpers/api */ "./src/client/helpers/api.js");




var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\app\\Controls.js";

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  height: 39px;\n  border-left: solid 1px #5a5a5a;\n  margin: 0 20px;\n"], ["\n  height: 39px;\n  border-left: solid 1px #5a5a5a;\n  margin: 0 20px;\n"]),
    _templateObject2 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  align-items: center;\n  padding: 10px;\n  margin: 60px 0 40px 0;\n  border-bottom: solid 1px #5a5a5a;\n  position: sticky;\n  top: 0;\n  background: linear-gradient(#3c1b1b, #371616) no-repeat;\n\n  @media (max-width: 768px) {\n    margin: 30px 0 20px 0;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  padding: 10px;\n  margin: 60px 0 40px 0;\n  border-bottom: solid 1px #5a5a5a;\n  position: sticky;\n  top: 0;\n  background: linear-gradient(#3c1b1b, #371616) no-repeat;\n\n  @media (max-width: 768px) {\n    margin: 30px 0 20px 0;\n  }\n"]),
    _templateObject3 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  flex-direction: row;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: center;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: center;\n  }\n"]),
    _templateObject4 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  width: 50px;\n  height: 50px;\n  transition: all 0.5s;\n\n  @media (max-width: 992px) {\n    width: 35px;\n    height: 35px;\n  }\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n    margin-bottom: 4px;\n  }\n"], ["\n  width: 50px;\n  height: 50px;\n  transition: all 0.5s;\n\n  @media (max-width: 992px) {\n    width: 35px;\n    height: 35px;\n  }\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n    margin-bottom: 4px;\n  }\n"]),
    _templateObject5 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 40px;\n  margin-left: 20px;\n  font-weight: 200;\n  line-height: normal;\n\n  transition: all 0.5s;\n\n  @media (max-width: 992px) {\n    font-size: 25px;\n  }\n\n  @media (max-width: 768px) {\n    font-size: 12px;\n    margin-left: 0;\n  }\n"], ["\n  font-size: 40px;\n  margin-left: 20px;\n  font-weight: 200;\n  line-height: normal;\n\n  transition: all 0.5s;\n\n  @media (max-width: 992px) {\n    font-size: 25px;\n  }\n\n  @media (max-width: 768px) {\n    font-size: 12px;\n    margin-left: 0;\n  }\n"]),
    _templateObject6 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  position: relative;\n  margin-right: 20px;\n  margin-left: auto;\n"], ["\n  position: relative;\n  margin-right: 20px;\n  margin-left: auto;\n"]);

 // eslint-disable-line no-unused-vars








var Controls = function Controls(_ref) {
  var handleGetLink = function () {
    var _ref2 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var shortcutIds, link;
      return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              shortcutIds = app.shortcuts.filter(function (e) {
                return e.isPinned;
              }).map(function (e) {
                return e._id;
              });
              _context.next = 3;
              return Object(_helpers_api__WEBPACK_IMPORTED_MODULE_10__["getLink"])(app._id, shortcutIds).then(function (data) {
                return data.text();
              });

            case 3:
              link = _context.sent;

              setPublicLink(link);
              Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["copyToClipboard"])(link);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function handleGetLink() {
      return _ref2.apply(this, arguments);
    };
  }();

  var icon = _ref.icon,
      name = _ref.name;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      app = _useContext.app,
      os = _useContext.os,
      doSetOs = _useContext.doSetOs;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(),
      _useState2 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),
      publicLink = _useState2[0],
      setPublicLink = _useState2[1];

  function handleGetLinkClose() {
    setPublicLink();
  }

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(
    Container,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      }
    },
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(
      NameWrapper,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      },
      react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Icon, { src: "/logos/" + icon, __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }),
      react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(
        Name,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          }
        },
        name
      )
    ),
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(SearchWrapper, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      }
    }),
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_OSSelect__WEBPACK_IMPORTED_MODULE_8__["default"], { onSelect: doSetOs, os: os, oss: app.oss, __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    }),
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Seperator, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      }
    }),
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_GetLink__WEBPACK_IMPORTED_MODULE_9__["default"], {
      onGetLink: handleGetLink,
      onClose: handleGetLinkClose,
      link: publicLink,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      }
    })
  );
};

/* harmony default export */ __webpack_exports__["default"] = (Controls);

var Seperator = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject);

var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject2);

var NameWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject3);

var Icon = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.img(_templateObject4);

var Name = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.h1(_templateObject5);

var SearchWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject6);

/***/ }),

/***/ "./src/client/pages/app/FirstTimeMessage.js":
/*!**************************************************!*\
  !*** ./src/client/pages/app/FirstTimeMessage.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ "babel-runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\app\\FirstTimeMessage.js";

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  padding: 10px;\n"], ["\n  padding: 10px;\n"]);

 // eslint-disable-line no-unused-vars


var FirstTimeMessage = function FirstTimeMessage(_ref) {
  var onDismiss = _ref.onDismiss;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    Container,
    { onClick: onDismiss, __source: {
        fileName: _jsxFileName,
        lineNumber: 4
      }
    },
    "message"
  );
};

/* harmony default export */ __webpack_exports__["default"] = (FirstTimeMessage);

var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject);

/***/ }),

/***/ "./src/client/pages/app/GetLink.js":
/*!*****************************************!*\
  !*** ./src/client/pages/app/GetLink.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./src/client/components/Button.js");
/* harmony import */ var _GetLinkPopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GetLinkPopup */ "./src/client/pages/app/GetLinkPopup.js");
var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\app\\GetLink.js";
 // eslint-disable-line no-unused-vars




var GetLink = function GetLink(_ref) {
  var link = _ref.link,
      onGetLink = _ref.onGetLink,
      onClose = _ref.onClose;

  var popupElm = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  function handleClickAway(e) {
    if (popupElm.current && !popupElm.current.contains(e.target)) onClose();
  }

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    document.addEventListener("mousedown", handleClickAway);

    return function () {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, []);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    "div",
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      }
    },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      _components_Button__WEBPACK_IMPORTED_MODULE_1__["default"],
      { onClick: onGetLink, __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "fas fa-link", __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }),
      "\xA0 Get Link"
    ),
    link && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GetLinkPopup__WEBPACK_IMPORTED_MODULE_2__["default"], { link: link, ref: popupElm, __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      }
    })
  );
};

/* harmony default export */ __webpack_exports__["default"] = (GetLink);

/***/ }),

/***/ "./src/client/pages/app/GetLinkPopup.js":
/*!**********************************************!*\
  !*** ./src/client/pages/app/GetLinkPopup.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ "babel-runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\app\\GetLinkPopup.js";

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  background: #2e2424;\n  max-width: 300px;\n  padding: 20px;\n  position: relative;\n  border-radius: 5px;\n  box-shadow: 0px 7px 23px 10px rgba(0, 0, 0, 0.4);\n\n  position: absolute;\n  right: 0;\n  top: 64px;\n\n  :after {\n    left: 80%;\n    margin-left: -4px;\n    top: -10px;\n    border-bottom: 10px solid #2e2424;\n    display: block;\n    position: absolute;\n    right: 20px;\n    vertical-align: middle;\n    content: \"\";\n    border-left: 8px solid transparent;\n    border-right: 8px solid transparent;\n    border-style: none double solid;\n    width: 0;\n    height: 0;\n  }\n  small {\n    color: #9d8b8b;\n  }\n"], ["\n  background: #2e2424;\n  max-width: 300px;\n  padding: 20px;\n  position: relative;\n  border-radius: 5px;\n  box-shadow: 0px 7px 23px 10px rgba(0, 0, 0, 0.4);\n\n  position: absolute;\n  right: 0;\n  top: 64px;\n\n  :after {\n    left: 80%;\n    margin-left: -4px;\n    top: -10px;\n    border-bottom: 10px solid #2e2424;\n    display: block;\n    position: absolute;\n    right: 20px;\n    vertical-align: middle;\n    content: \"\";\n    border-left: 8px solid transparent;\n    border-right: 8px solid transparent;\n    border-style: none double solid;\n    width: 0;\n    height: 0;\n  }\n  small {\n    color: #9d8b8b;\n  }\n"]),
    _templateObject2 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  padding: 6px;\n  border: solid 1px #423737;\n  color: #ffe6ab;\n  background: #261d1d;\n  border-radius: 5px;\n  font-size: 12px;\n  width: 100%;\n"], ["\n  padding: 6px;\n  border: solid 1px #423737;\n  color: #ffe6ab;\n  background: #261d1d;\n  border-radius: 5px;\n  font-size: 12px;\n  width: 100%;\n"]),
    _templateObject3 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  margin: 20px 0 10px;\n"], ["\n  margin: 20px 0 10px;\n"]),
    _templateObject4 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-weight: 300;\n"], ["\n  font-weight: 300;\n"]);

 // eslint-disable-line no-unused-vars


var GetLinkPopup = react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef(function (props, ref) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    Container,
    { ref: ref, __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      }
    },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      "b",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      },
      "Done! "
    ),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      Text,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      },
      "Your selected shortcuts are saved with this link. You can share it with friends or save it for future reference."
    ),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      InputWrapper,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      },
      react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Input, {
        type: "text",
        value: props.link,
        onFocus: function onFocus(event) {
          return event.target.select();
        },
        readOnly: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }),
      react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }),
      react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        "small",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          }
        },
        "Link copied to clipboard"
      )
    )
  );
});

/* harmony default export */ __webpack_exports__["default"] = (GetLinkPopup);

var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject);

var Input = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.input(_templateObject2);

var InputWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject3);

var Text = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject4);

// const Seperator = styled.hr`
//   border: 0;
//   border-top: 1px solid #453a3a;
// `

/***/ }),

/***/ "./src/client/pages/app/OSSelect.js":
/*!******************************************!*\
  !*** ./src/client/pages/app/OSSelect.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ "babel-runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\app\\OSSelect.js";

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 30px;\n  i + i {\n    margin-left: 20px;\n  }\n"], ["\n  font-size: 30px;\n  i + i {\n    margin-left: 20px;\n  }\n"]);

 // eslint-disable-line no-unused-vars


function OSSelect(_ref) {
  var oss = _ref.oss,
      os = _ref.os,
      onSelect = _ref.onSelect;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    Container,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      }
    },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(OSButton, {
      buttonOS: "win",
      selectedOS: os,
      supportedOSS: oss,
      onClick: onSelect,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      }
    }),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(OSButton, {
      buttonOS: "mac",
      selectedOS: os,
      supportedOSS: oss,
      onClick: onSelect,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    })
  );
}

var OSButton = function OSButton(_ref2) {
  var buttonOS = _ref2.buttonOS,
      selectedOS = _ref2.selectedOS,
      supportedOSS = _ref2.supportedOSS,
      _onClick = _ref2.onClick;

  var SELECTED_COLOR = "#E9E5E5";
  var UNSELECTED_COLOR = "#5A5A5A";
  var iconName = buttonOS === "mac" ? "apple" : "windows";

  return supportedOSS.includes(buttonOS) && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "fab fa-" + iconName,
    style: {
      color: selectedOS === buttonOS ? SELECTED_COLOR : UNSELECTED_COLOR,
      cursor: selectedOS === buttonOS ? "default" : "pointer"
    },
    onClick: function onClick() {
      return selectedOS === buttonOS ? undefined : _onClick(buttonOS);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (OSSelect);

var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.span(_templateObject);

/***/ }),

/***/ "./src/client/pages/app/Pin.js":
/*!*************************************!*\
  !*** ./src/client/pages/app/Pin.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Shortcut; });
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ "babel-runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");

var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\app\\Pin.js";

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: inline-flex;\n  width: 100%;\n  align-items: flex-start;\n  border: solid 1px ", ";\n  border-radius: 3px;\n  padding: 5px 0 3px;\n  cursor: pointer;\n  vertical-align: middle;\n  user-select: none;\n\n  img {\n    height: 12px;\n  }\n\n  :hover {\n    border-color: ", ";\n  }\n"], ["\n  display: inline-flex;\n  width: 100%;\n  align-items: flex-start;\n  border: solid 1px ", ";\n  border-radius: 3px;\n  padding: 5px 0 3px;\n  cursor: pointer;\n  vertical-align: middle;\n  user-select: none;\n\n  img {\n    height: 12px;\n  }\n\n  :hover {\n    border-color: ", ";\n  }\n"]),
    _templateObject2 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  line-height: 11px;\n  margin-left: 7px;\n"], ["\n  line-height: 11px;\n  margin-left: 7px;\n"]),
    _templateObject3 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 11px;\n  color: ", ";\n  margin: 0 auto;\n  padding: 0 6px;\n  line-height: 10px;\n"], ["\n  font-size: 11px;\n  color: ", ";\n  margin: 0 auto;\n  padding: 0 6px;\n  line-height: 10px;\n"]);

 // eslint-disable-line no-unused-vars





function Shortcut(_ref) {
  var pins = _ref.pins,
      isPinned = _ref.isPinned,
      onClick = _ref.onClick;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    Container,
    { isPinned: isPinned, onClick: onClick, __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      IconWrapper,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      },
      isPinned ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: "/pin-on.svg", alt: "", __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: "/pin-off.svg", alt: "", __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      })
    ),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      Count,
      { isPinned: isPinned, __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      },
      pins
    )
  );
}

Shortcut.propTypes = {
  pins: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  isPinned: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired
};

var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject, function (_ref2) {
  var isPinned = _ref2.isPinned;
  return isPinned ? "#ffe6ab" : "#9D8B8B";
}, function (_ref3) {
  var isPinned = _ref3.isPinned;
  return isPinned ? Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["lightenDarkenColor"])("#ffe6ab", 50) : Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["lightenDarkenColor"])("#9D8B8B", 50);
});

var IconWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.span(_templateObject2);

var Count = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.span(_templateObject3, function (_ref4) {
  var isPinned = _ref4.isPinned;
  return isPinned ? "#ffe6ab" : "#E9E5E5";
});

/***/ }),

/***/ "./src/client/pages/app/Shortcut.js":
/*!******************************************!*\
  !*** ./src/client/pages/app/Shortcut.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Shortcut; });
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ "babel-runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ "babel-runtime/core-js/get-iterator");
/* harmony import */ var babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");


var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\app\\Shortcut.js";

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  margin: 0 3px;\n"], ["\n  margin: 0 3px;\n"]),
    _templateObject2 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-style: italic;\n  margin: 0 3px;\n"], ["\n  font-style: italic;\n  margin: 0 3px;\n"]),
    _templateObject3 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: ", ";\n  flex-wrap: wrap;\n  font-size: 14px;\n  color: #e9e5e5;\n\n  kbd {\n    font-size: 14px;\n  }\n\n  .kbn-or {\n    padding: 1px 10px;\n  }\n"], ["\n  display: ", ";\n  flex-wrap: wrap;\n  font-size: 14px;\n  color: #e9e5e5;\n\n  kbd {\n    font-size: 14px;\n  }\n\n  .kbn-or {\n    padding: 1px 10px;\n  }\n"]);

 // eslint-disable-line no-unused-vars





function split(keysArr, seperator) {
  var newArr = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1___default()(keysArr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item1 = _step.value;

      var item1Split = item1.split(seperator);
      for (var i = 0; i < item1Split.length; i++) {
        newArr.push(item1Split[i].trim());

        // dont add seperator after last element
        if (i !== item1Split.length - 1) {
          newArr.push(seperator);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return newArr;
}

function Shortcut(_ref) {
  var keys = _ref.keys,
      isHtml = _ref.isHtml;

  if (isHtml) return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Container, {
    dangerouslySetInnerHTML: { __html: prepareHtml(keys) },
    isHtml: isHtml,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  });

  var keysArr = split([keys], " or ");

  return keysArr.map(function (e, index) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
      "div",
      { key: index, __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      },
      react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ShortcutOption, { keys: e, __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        }
      }),
      " "
    );
  });
}

function prepareHtml(html) {
  var isEnding = false;

  while (html.includes("**")) {
    html = html.replace("**", isEnding ? "</kbd>" : "<kbd>");
    isEnding = !isEnding;
  }

  return Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["upperFirstLetter"])(html);
}

function ShortcutOption(_ref2) {
  var keys = _ref2.keys;

  var keysArr = split([keys], "+");
  keysArr = split(keysArr, "|");
  keysArr = split(keysArr, "..");
  keysArr = split(keysArr, " ");

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
    Container,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      }
    },
    keysArr.map(function (key, index) {
      var numpad = void 0;
      if (key.includes("numpad")) {
        key = key.replace("numpad", "");
        numpad = " Numpad ";
      }
      var toRender = void 0;

      key = key.toLowerCase();

      switch (key) {
        case "arrows":
        case "+":
        case "..":
          return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
            Spacer,
            { key: index, __source: {
                fileName: _jsxFileName,
                lineNumber: 75
              }
            },
            key
          );
        case " ":
          return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
            Then,
            { key: index, __source: {
                fileName: _jsxFileName,
                lineNumber: 77
              }
            },
            "then"
          );
        case "or":
          return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
            "div",
            { key: index, className: "kbn-or", __source: {
                fileName: _jsxFileName,
                lineNumber: 80
              }
            },
            "or"
          );
        case "plus":
          toRender = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
            "kbd",
            { key: index, __source: {
                fileName: _jsxFileName,
                lineNumber: 85
              }
            },
            "+"
          );
          break;
        case "|":
          return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
            Spacer,
            { key: index, __source: {
                fileName: _jsxFileName,
                lineNumber: 88
              }
            },
            "/"
          );
        case "up":
        case "down":
        case "left":
        case "right":
          toRender = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
            "kbd",
            { key: index, __source: {
                fileName: _jsxFileName,
                lineNumber: 94
              }
            },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fas fa-long-arrow-alt-" + key, __source: {
                fileName: _jsxFileName,
                lineNumber: 95
              }
            })
          );
          break;
        default:
          toRender = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
            "kbd",
            { key: index, __source: {
                fileName: _jsxFileName,
                lineNumber: 100
              }
            },
            Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["upperFirstLetter"])(key)
          );
          break;
      }
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
        react__WEBPACK_IMPORTED_MODULE_2__["Fragment"],
        { key: index, __source: {
            fileName: _jsxFileName,
            lineNumber: 104
          }
        },
        numpad && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
          Spacer,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 105
            }
          },
          "numpad"
        ),
        toRender
      );
    })
  );
}

Shortcut.propTypes = {
  keys: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired
};

var Spacer = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject);

var Then = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject2);

var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject3, function (props) {
  return props.isHtml ? "block" : "inline-flex";
});

/***/ }),

/***/ "./src/client/pages/app/ShortcutItem.js":
/*!**********************************************!*\
  !*** ./src/client/pages/app/ShortcutItem.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ "babel-runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ "babel-runtime/helpers/slicedToArray");
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../helpers/api */ "./src/client/helpers/api.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");
/* harmony import */ var _Shortcut__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Shortcut */ "./src/client/pages/app/Shortcut.js");
/* harmony import */ var _Pin__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Pin */ "./src/client/pages/app/Pin.js");




var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\app\\ShortcutItem.js";

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 13px;\n  color: #a4a3a6;\n  margin-left: 10px;\n  cursor: pointer;\n"], ["\n  font-size: 13px;\n  color: #a4a3a6;\n  margin-left: 10px;\n  cursor: pointer;\n"]),
    _templateObject2 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 13px;\n  color: #a4a3a6;\n  margin-top: 3px;\n"], ["\n  font-size: 13px;\n  color: #a4a3a6;\n  margin-top: 3px;\n"]),
    _templateObject3 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: ", ";\n  user-select: none;  \n  padding-right:20px;\n"], ["\n  color: ", ";\n  user-select: none;  \n  padding-right:20px;\n"]),
    _templateObject4 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  // width: 1%;\n  text-align: center;\n  padding: 0 13px 0 15px;\n  user-select: none;\n"], ["\n  // width: 1%;\n  text-align: center;\n  padding: 0 13px 0 15px;\n  user-select: none;\n"]),
    _templateObject5 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  padding: 0 13px 0 0;\n"], ["\n  padding: 0 13px 0 0;\n"]);

 // eslint-disable-line no-unused-vars









function ShortcutItem(_ref) {
  var handlePin = function () {
    var _ref2 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var newPins, newIsPinned;
      return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newPins = isPinnedState ? pins : pins + 1;
              newIsPinned = !isPinnedState;

              setPinsState(newPins);
              setIsPinnedState(newIsPinned);

              doPin(id, newPins, newIsPinned);
              _context.next = 7;
              return Object(_helpers_api__WEBPACK_IMPORTED_MODULE_8__["pin"])(app._id, id, newIsPinned);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function handlePin() {
      return _ref2.apply(this, arguments);
    };
  }();

  var id = _ref.id,
      action = _ref.action,
      keys = _ref.keys,
      pins = _ref.pins,
      isPinned = _ref.isPinned,
      isHtml = _ref.isHtml,
      note = _ref.note;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      app = _useContext.app,
      doPin = _useContext.doPin;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(pins),
      _useState2 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),
      pinsState = _useState2[0],
      setPinsState = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      _useState4 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState3, 2),
      infoVisible = _useState4[0],
      setInfoVisible = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(isPinned),
      _useState6 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState5, 2),
      isPinnedState = _useState6[0],
      setIsPinnedState = _useState6[1];

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(
    react__WEBPACK_IMPORTED_MODULE_4__["Fragment"],
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    },
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(
      PinContainer,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      },
      react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Pin__WEBPACK_IMPORTED_MODULE_11__["default"], { isPinned: isPinnedState, pins: pinsState, onClick: handlePin, __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      })
    ),
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(
      ActionContainer,
      { isPinned: isPinnedState, __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      },
      Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["upperFirstLetter"])(action),
      note && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(InfoIcon, {
        className: "fas fa-info",
        onClick: function onClick() {
          return setInfoVisible(!infoVisible);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        }
      }),
      infoVisible && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(
        InfoContainer,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          }
        },
        note
      )
    ),
    react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(
      KeysContainer,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      },
      react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Shortcut__WEBPACK_IMPORTED_MODULE_10__["default"], { keys: keys, isHtml: isHtml, __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      })
    )
  );
}

ShortcutItem.propTypes = {
  action: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired,
  keys: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired
};

/* harmony default export */ __webpack_exports__["default"] = (ShortcutItem);

var InfoIcon = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.i(_templateObject);

var InfoContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject2);

var ActionContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject3, function (props) {
  return props.isPinned ? "#ffe6ab" : "inherit";
});

var PinContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject4);

var KeysContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject5);

/***/ }),

/***/ "./src/client/pages/app/ShortcutList.js":
/*!**********************************************!*\
  !*** ./src/client/pages/app/ShortcutList.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShortcutList; });
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ "babel-runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ShortcutItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShortcutItem */ "./src/client/pages/app/ShortcutItem.js");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");

var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\app\\ShortcutList.js";

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: inline-block;\n  margin-bottom: 40px;\n  font-size: 14px;\n  border-radius: 5px;\n  overflow: hidden;\n  width: 100%;\n"], ["\n  display: inline-block;\n  margin-bottom: 40px;\n  font-size: 14px;\n  border-radius: 5px;\n  overflow: hidden;\n  width: 100%;\n"]),
    _templateObject2 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #e9e5e5;\n  background: #a12d2a;\n  padding: 5px 10px 7px 15px;\n"], ["\n  color: #e9e5e5;\n  background: #a12d2a;\n  padding: 5px 10px 7px 15px;\n"]),
    _templateObject3 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: grid;\n  grid-gap: 8px 0;\n  grid-template-columns: 80px 1fr 1fr;\n  padding: 8px 0;\n  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);\n  background: #2e2424;\n  font-weight: 300;\n\n  > div {\n    border-bottom: solid 1px #453a3a;\n    padding-bottom:8px;\n  }\n"], ["\n  display: grid;\n  grid-gap: 8px 0;\n  grid-template-columns: 80px 1fr 1fr;\n  padding: 8px 0;\n  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);\n  background: #2e2424;\n  font-weight: 300;\n\n  > div {\n    border-bottom: solid 1px #453a3a;\n    padding-bottom:8px;\n  }\n"]);

 // eslint-disable-line no-unused-vars







function ShortcutList(_ref) {
  var title = _ref.title,
      shortcuts = _ref.shortcuts;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_4__["default"]),
      os = _useContext.os;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    Container,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      Title,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      },
      Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["upperFirstLetter"])(title)
    ),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      Table,
      { cellSpacing: 0, __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      },
      shortcuts.map(function (shortcut) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ShortcutItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
          key: shortcut._id,
          id: shortcut._id,
          keys: shortcut[os],
          action: shortcut.action,
          note: shortcut.note,
          pins: shortcut.pins,
          isHtml: shortcut.isHtml,
          isPinned: !!shortcut.isPinned,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          }
        });
      })
    )
  );
}

var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject);

var Title = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.header(_templateObject2);

var Table = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject3);

/***/ }),

/***/ "babel-runtime/helpers/slicedToArray":
/*!******************************************************!*\
  !*** external "babel-runtime/helpers/slicedToArray" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ })

};
//# sourceMappingURL=main.61d00de7e844e2d4429e.hot-update.js.map