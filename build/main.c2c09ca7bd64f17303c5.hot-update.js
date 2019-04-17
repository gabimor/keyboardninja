exports.id = "main";
exports.modules = {

/***/ "./src/client/components/AppItem.js":
/*!******************************************!*\
  !*** ./src/client/components/AppItem.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return App; });\n/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ \"babel-runtime/helpers/taggedTemplateLiteral\");\n/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ \"@emotion/styled\");\n/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ \"./src/client/helpers/index.js\");\n\nvar _jsxFileName = \"C:\\\\MyStull\\\\Code\\\\keyboardninja\\\\src\\\\client\\\\components\\\\AppItem.js\";\n\nvar _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  \", \"\\n  position: relative;\\n  overflow: hidden;\\n\"], [\"\\n  \", \"\\n  position: relative;\\n  overflow: hidden;\\n\"]),\n    _templateObject2 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  background: #d1403d;\\n  color: #cccad2;\\n  position: absolute;\\n  top: 10px;\\n  left: -20px;\\n  transform: rotate(-45deg);\\n  font-size: 13px;\\n  width: 80px;\\n  text-align: center;\\n  z-index: 1;\\n\"], [\"\\n  background: #d1403d;\\n  color: #cccad2;\\n  position: absolute;\\n  top: 10px;\\n  left: -20px;\\n  transform: rotate(-45deg);\\n  font-size: 13px;\\n  width: 80px;\\n  text-align: center;\\n  z-index: 1;\\n\"]),\n    _templateObject3 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  \", \"\\n  cursor: pointer;\\n\\n  :hover {\\n    color: #e9e5e5;\\n    background: \", \";\\n    transform: scale(1.04);\\n  }\\n\"], [\"\\n  \", \"\\n  cursor: pointer;\\n\\n  :hover {\\n    color: #e9e5e5;\\n    background: \", \";\\n    transform: scale(1.04);\\n  }\\n\"]),\n    _templateObject4 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  text-align: center;\\n  font-size: 14px;\\n  opacity: \", \";\\n\"], [\"\\n  text-align: center;\\n  font-size: 14px;\\n  opacity: \", \";\\n\"]),\n    _templateObject5 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  width: 60%;\\n  margin-bottom: 5px;\\n  opacity: \", \";\\n\"], [\"\\n  width: 60%;\\n  margin-bottom: 5px;\\n  opacity: \", \";\\n\"]);\n\n // eslint-disable-line no-unused-vars\n\n\n\n\nfunction App(_ref) {\n  var name = _ref.name,\n      icon = _ref.icon,\n      disabled = _ref.disabled;\n\n  var Container = disabled ? DisabledContainer : EnabledContainer;\n  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\n    Container,\n    {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 9\n      }\n    },\n    disabled && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\n      Soon,\n      {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 10\n        }\n      },\n      \"Soon\"\n    ),\n    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Image, { src: icon, disabled: disabled, __source: {\n        fileName: _jsxFileName,\n        lineNumber: 11\n      }\n    }),\n    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\n      Name,\n      { disabled: disabled, __source: {\n          fileName: _jsxFileName,\n          lineNumber: 12\n        }\n      },\n      name\n    )\n  );\n}\n\nvar sharedStyles = \"\\n  display: inline-flex;\\n  padding: 10px;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  background-color: #403434;\\n  color: #d1b4b4;\\n  height: var(--appItemSize);  \\n  transition: all 0.5s;\\n\\n  @media (min-width: 992px) {\\n    width: var(--appItemSize);\\n  }\\n\\n  @media (max-width: 768px) {\\n      font-size:12px;        \\n  }\\n\\n\";\n\nvar DisabledContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject, sharedStyles);\n\nvar Soon = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject2);\n\nvar EnabledContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject3, sharedStyles, Object(_helpers__WEBPACK_IMPORTED_MODULE_3__[\"lightenDarkenColor\"])(\"#4F4242\", 10));\n\nvar Name = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject4, [function (props) {\n  return props.disabled ? 0.3 : 1;\n}]);\nvar Image = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.img(_templateObject5, [function (props) {\n  return props.disabled ? 0.3 : 1;\n}]);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQXBwSXRlbS5qcz8zMDFkIl0sIm5hbWVzIjpbIkFwcCIsIm5hbWUiLCJpY29uIiwiZGlzYWJsZWQiLCJDb250YWluZXIiLCJEaXNhYmxlZENvbnRhaW5lciIsIkVuYWJsZWRDb250YWluZXIiLCJzaGFyZWRTdHlsZXMiLCJzdHlsZWQiLCJkaXYiLCJTb29uIiwibGlnaHRlbkRhcmtlbkNvbG9yIiwiTmFtZSIsInByb3BzIiwiSW1hZ2UiLCJpbWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUEwQjs7QUFFMUI7QUFDQTs7QUFFZSxTQUFTQSxHQUFULE9BQXVDO0FBQUEsTUFBeEJDLElBQXdCLFFBQXhCQSxJQUF3QjtBQUFBLE1BQWxCQyxJQUFrQixRQUFsQkEsSUFBa0I7QUFBQSxNQUFaQyxRQUFZLFFBQVpBLFFBQVk7O0FBQ3BELE1BQU1DLFlBQVlELFdBQVdFLGlCQUFYLEdBQStCQyxnQkFBakQ7QUFDQSxTQUNFO0FBQUMsYUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNHSCxnQkFBWTtBQUFDLFVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBRGY7QUFFRSwrREFBQyxLQUFELElBQU8sS0FBS0QsSUFBWixFQUFrQixVQUFVQyxRQUE1QjtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BRkY7QUFHRTtBQUFDLFVBQUQ7QUFBQSxRQUFNLFVBQVVBLFFBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMkJGO0FBQTNCO0FBSEYsR0FERjtBQU9EOztBQUVELElBQU1NLHFZQUFOOztBQXFCQSxJQUFNRixvQkFBb0JHLHNEQUFNQSxDQUFDQyxHQUEzQixrQkFDRkYsWUFERSxDQUFOOztBQU1BLElBQU1HLE9BQU9GLHNEQUFNQSxDQUFDQyxHQUFkLGtCQUFOOztBQWFBLElBQU1ILG1CQUFtQkUsc0RBQU1BLENBQUNDLEdBQTFCLG1CQUNGRixZQURFLEVBTVlJLG1FQUFrQkEsQ0FBQyxTQUFuQixFQUE4QixFQUE5QixDQU5aLENBQU47O0FBV0EsSUFBTUMsT0FBT0osc0RBQU1BLENBQUNDLEdBQWQsbUJBR08sQ0FBQztBQUFBLFNBQVVJLE1BQU1WLFFBQU4sR0FBaUIsR0FBakIsR0FBdUIsQ0FBakM7QUFBQSxDQUFELENBSFAsQ0FBTjtBQUtBLElBQU1XLFFBQVFOLHNEQUFNQSxDQUFDTyxHQUFmLG1CQUdPLENBQUM7QUFBQSxTQUFVRixNQUFNVixRQUFOLEdBQWlCLEdBQWpCLEdBQXVCLENBQWpDO0FBQUEsQ0FBRCxDQUhQLENBQU4iLCJmaWxlIjoiLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQXBwSXRlbS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcblxyXG5pbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIlxyXG5pbXBvcnQgeyBsaWdodGVuRGFya2VuQ29sb3IgfSBmcm9tIFwiLi4vaGVscGVyc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBuYW1lLCBpY29uLCBkaXNhYmxlZCB9KSB7XHJcbiAgY29uc3QgQ29udGFpbmVyID0gZGlzYWJsZWQgPyBEaXNhYmxlZENvbnRhaW5lciA6IEVuYWJsZWRDb250YWluZXJcclxuICByZXR1cm4gKFxyXG4gICAgPENvbnRhaW5lcj5cclxuICAgICAge2Rpc2FibGVkICYmIDxTb29uPlNvb248L1Nvb24+fVxyXG4gICAgICA8SW1hZ2Ugc3JjPXtpY29ufSBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+XHJcbiAgICAgIDxOYW1lIGRpc2FibGVkPXtkaXNhYmxlZH0+e25hbWV9PC9OYW1lPlxyXG4gICAgPC9Db250YWluZXI+XHJcbiAgKVxyXG59XHJcblxyXG5jb25zdCBzaGFyZWRTdHlsZXMgPSBgXHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQwMzQzNDtcclxuICBjb2xvcjogI2QxYjRiNDtcclxuICBoZWlnaHQ6IHZhcigtLWFwcEl0ZW1TaXplKTsgIFxyXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzO1xyXG5cclxuICBAbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcclxuICAgIHdpZHRoOiB2YXIoLS1hcHBJdGVtU2l6ZSk7XHJcbiAgfVxyXG5cclxuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgICAgZm9udC1zaXplOjEycHg7ICAgICAgICBcclxuICB9XHJcblxyXG5gXHJcblxyXG5jb25zdCBEaXNhYmxlZENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXHJcbiAgJHtzaGFyZWRTdHlsZXN9XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbmBcclxuXHJcbmNvbnN0IFNvb24gPSBzdHlsZWQuZGl2YFxyXG4gIGJhY2tncm91bmQ6ICNkMTQwM2Q7XHJcbiAgY29sb3I6ICNjY2NhZDI7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMTBweDtcclxuICBsZWZ0OiAtMjBweDtcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICB3aWR0aDogODBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgei1pbmRleDogMTtcclxuYFxyXG5cclxuY29uc3QgRW5hYmxlZENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXHJcbiAgJHtzaGFyZWRTdHlsZXN9XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG5cclxuICA6aG92ZXIge1xyXG4gICAgY29sb3I6ICNlOWU1ZTU7XHJcbiAgICBiYWNrZ3JvdW5kOiAke2xpZ2h0ZW5EYXJrZW5Db2xvcihcIiM0RjQyNDJcIiwgMTApfTtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wNCk7XHJcbiAgfVxyXG5gXHJcblxyXG5jb25zdCBOYW1lID0gc3R5bGVkLmRpdmBcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIG9wYWNpdHk6ICR7W3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/IDAuMyA6IDEpXX07XHJcbmBcclxuY29uc3QgSW1hZ2UgPSBzdHlsZWQuaW1nYFxyXG4gIHdpZHRoOiA2MCU7XHJcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gIG9wYWNpdHk6ICR7W3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/IDAuMyA6IDEpXX07XHJcbmBcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/client/components/AppItem.js\n");

/***/ })

};