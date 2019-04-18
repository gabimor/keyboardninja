exports.id = "main";
exports.modules = {

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
    _templateObject2 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  align-items: center;\n  padding: 10px;\n  margin: 60px 0 20px 0;\n  border-bottom: solid 1px #5a5a5a;\n  position: sticky;\n  top: 0;\n  background: linear-gradient(#3c1b1b, #371616) no-repeat;\n\n  @media (max-width: 768px) {\n    margin: 30px 0 20px 0;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  padding: 10px;\n  margin: 60px 0 20px 0;\n  border-bottom: solid 1px #5a5a5a;\n  position: sticky;\n  top: 0;\n  background: linear-gradient(#3c1b1b, #371616) no-repeat;\n\n  @media (max-width: 768px) {\n    margin: 30px 0 20px 0;\n  }\n"]),
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

/***/ })

};
//# sourceMappingURL=main.0075cd4c19a30909662e.hot-update.js.map