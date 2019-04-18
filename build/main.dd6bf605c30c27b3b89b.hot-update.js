exports.id = "main";
exports.modules = {

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


var _jsxFileName = "C:\\MyStull\\Code\\keyboardninja\\src\\client\\pages\\App.js";

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  columns: 2;\n  column-gap: 30px;\n\n  @media (max-width: 1122px) {\n    columns: 1;\n  }\n"], ["\n  columns: 2;\n  column-gap: 30px;\n\n  @media (max-width: 1122px) {\n    columns: 1;\n  }\n"]);

 // eslint-disable-line no-unused-vars









var App = function App() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
      app = _useContext.app,
      os = _useContext.os;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      _useState2 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      messageVisible = _useState2[0],
      setMessageVisible = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    console.log(document.cookie);
    setMessageVisible(true);
  }, []);

  var encodedName = Object(_helpers__WEBPACK_IMPORTED_MODULE_8__["encodeAppName"])(app.name);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
    "div",
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      }
    },
    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_app_Controls__WEBPACK_IMPORTED_MODULE_7__["default"], { icon: encodedName + ".png", name: app.name, __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    }),
    messageVisible && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_app_FirstTimeMessage__WEBPACK_IMPORTED_MODULE_5__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      }
    }),
    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
      ResultsContainer,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
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
            lineNumber: 34
          }
        });
      })
    )
  );
};

/* harmony default export */ __webpack_exports__["default"] = (App);

var ResultsContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject);

/***/ })

};
//# sourceMappingURL=main.dd6bf605c30c27b3b89b.hot-update.js.map