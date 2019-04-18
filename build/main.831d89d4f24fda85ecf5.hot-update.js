exports.id = "main";
exports.modules = {

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

var _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: inline-flex;\n  width: 100%;\n  align-items: flex-start;\n  border: solid 1px ", ";\n  border-radius: 3px;\n  padding: 5px 0 3px;\n  cursor: pointer;\n  vertical-align: middle;\n  user-select: none;\n\n  img {\n    height: 12px;\n  }\n\n  :hover {\n    border-color: ", ";\n    span {\n      color: ", ";\n    }\n  }\n"], ["\n  display: inline-flex;\n  width: 100%;\n  align-items: flex-start;\n  border: solid 1px ", ";\n  border-radius: 3px;\n  padding: 5px 0 3px;\n  cursor: pointer;\n  vertical-align: middle;\n  user-select: none;\n\n  img {\n    height: 12px;\n  }\n\n  :hover {\n    border-color: ", ";\n    span {\n      color: ", ";\n    }\n  }\n"]),
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
  return isPinned ? "#ffdb87" : "#e9e5e5";
}, function (_ref4) {
  var isPinned = _ref4.isPinned;
  return isPinned ? "#ffdb87" : "#FFFFFF";
});

var IconWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.span(_templateObject2);

var Count = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.span(_templateObject3, function (_ref5) {
  var isPinned = _ref5.isPinned;
  return isPinned ? "#ffe6ab" : "#E9E5E5";
});

/***/ })

};
//# sourceMappingURL=main.831d89d4f24fda85ecf5.hot-update.js.map