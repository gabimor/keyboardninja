exports.id = "main";
exports.modules = {

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

/***/ })

};
//# sourceMappingURL=main.e4c92aad6db8fbea5b29.hot-update.js.map