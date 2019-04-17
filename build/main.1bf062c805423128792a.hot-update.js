exports.id = "main";
exports.modules = {

/***/ "./src/client/pages/Home.js":
/*!**********************************!*\
  !*** ./src/client/pages/Home.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ \"babel-runtime/helpers/taggedTemplateLiteral\");\n/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/extends */ \"babel-runtime/helpers/extends\");\n/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ \"@emotion/styled\");\n/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_AppList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/AppList */ \"./src/client/components/AppList.js\");\n/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DataContext */ \"./src/client/DataContext.js\");\n\n\nvar _jsxFileName = \"C:\\\\MyStull\\\\Code\\\\keyboardninja\\\\src\\\\client\\\\pages\\\\Home.js\";\n\nvar _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  max-width: 1024px;\\n  margin: 0 auto;\\n\"], [\"\\n  max-width: 1024px;\\n  margin: 0 auto;\\n\"]),\n    _templateObject2 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  display: grid;\\n  grid-gap: 60px;\\n  grid-template-areas:\\n    \\\"os browsers browsers\\\"\\n    \\\"coding coding coding\\\"\\n    \\\"casual casual casual\\\"\\n    \\\"graphics graphics graphics\\\"\\n    \\\"office office office\\\";\\n\\n  @media (max-width: 99px) {\\n    grid-template-areas:\\n      \\\"os\\\"\\n      \\\"browsers\\\"\\n      \\\"coding\\\"\\n      \\\"casual\\\"\\n      \\\"graphics\\\"\\n      \\\"office\\\";\\n  }\\n\"], [\"\\n  display: grid;\\n  grid-gap: 60px;\\n  grid-template-areas:\\n    \\\"os browsers browsers\\\"\\n    \\\"coding coding coding\\\"\\n    \\\"casual casual casual\\\"\\n    \\\"graphics graphics graphics\\\"\\n    \\\"office office office\\\";\\n\\n  @media (max-width: 99px) {\\n    grid-template-areas:\\n      \\\"os\\\"\\n      \\\"browsers\\\"\\n      \\\"coding\\\"\\n      \\\"casual\\\"\\n      \\\"graphics\\\"\\n      \\\"office\\\";\\n  }\\n\"]),\n    _templateObject3 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  color: #ffffff;\\n  font-size: 50px;\\n  margin-top: 150px;\\n  margin-bottom: 190px;\\n  text-align: center;\\n  font-weight: 300;\\n  line-height: 1.5em;\\n\\n  & b {\\n    font-weight: 500;\\n  }\\n\\n  @media (max-width: 992px) {\\n    margin-top: 50px;\\n    margin-bottom: 70px;\\n    font-size: 30px;\\n  }\\n\"], [\"\\n  color: #ffffff;\\n  font-size: 50px;\\n  margin-top: 150px;\\n  margin-bottom: 190px;\\n  text-align: center;\\n  font-weight: 300;\\n  line-height: 1.5em;\\n\\n  & b {\\n    font-weight: 500;\\n  }\\n\\n  @media (max-width: 992px) {\\n    margin-top: 50px;\\n    margin-bottom: 70px;\\n    font-size: 30px;\\n  }\\n\"]);\n\n // eslint-disable-line no-unused-vars\n\n\n\n\n\nvar Home = function Home() {\n  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useContext\"])(_DataContext__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n      appCategories = _useContext.appCategories;\n\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\n    Container,\n    {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 11\n      }\n    },\n    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\n      Hero,\n      {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 12\n        }\n      },\n      \"Every app, every shortcut, \",\n      react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\n        \"b\",\n        {\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 13\n          }\n        },\n        \"the best ones first.\"\n      )\n    ),\n    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\n      GridContainer,\n      {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 15\n        }\n      },\n      appCategories.map(function (appCategory) {\n        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_AppList__WEBPACK_IMPORTED_MODULE_4__[\"default\"], babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({ key: appCategory.gridArea }, appCategory, {\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 17\n          }\n        }));\n      })\n    )\n  );\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\n\nvar Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject);\n\nvar GridContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject2);\n\nvar Hero = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.h1(_templateObject3);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3BhZ2VzL0hvbWUuanM/ODZiMyJdLCJuYW1lcyI6WyJIb21lIiwidXNlQ29udGV4dCIsIkRhdGFDb250ZXh0IiwiYXBwQ2F0ZWdvcmllcyIsIm1hcCIsImFwcENhdGVnb3J5IiwiZ3JpZEFyZWEiLCJDb250YWluZXIiLCJzdHlsZWQiLCJkaXYiLCJHcmlkQ29udGFpbmVyIiwiSGVybyIsImgxIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQW9EO0FBQ3BEOztBQUVBO0FBQ0E7O0FBRUEsSUFBTUEsT0FBTyxTQUFQQSxJQUFPLEdBQU07QUFBQSxvQkFDU0Msd0RBQVVBLENBQUNDLG9EQUFYLENBRFQ7QUFBQSxNQUNUQyxhQURTLGVBQ1RBLGFBRFM7O0FBR2pCLFNBQ0U7QUFBQyxhQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0U7QUFBQyxVQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEN0IsS0FERjtBQUlFO0FBQUMsbUJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDR0Esb0JBQWNDLEdBQWQsQ0FBa0I7QUFBQSxlQUNqQiwyREFBQywyREFBRCx5RUFBUyxLQUFLQyxZQUFZQyxRQUExQixJQUF3Q0QsV0FBeEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBRGlCO0FBQUEsT0FBbEI7QUFESDtBQUpGLEdBREY7QUFZRCxDQWZEOztBQWlCZUwsbUVBQWY7O0FBRUEsSUFBTU8sWUFBWUMsc0RBQU1BLENBQUNDLEdBQW5CLGlCQUFOOztBQUtBLElBQU1DLGdCQUFnQkYsc0RBQU1BLENBQUNDLEdBQXZCLGtCQUFOOztBQXFCQSxJQUFNRSxPQUFPSCxzREFBTUEsQ0FBQ0ksRUFBZCxrQkFBTiIsImZpbGUiOiIuL3NyYy9jbGllbnQvcGFnZXMvSG9tZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBGcmFnbWVudCwgdXNlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCJcclxuXHJcbmltcG9ydCBBcHBMaXN0IGZyb20gXCIuLi9jb21wb25lbnRzL0FwcExpc3RcIlxyXG5pbXBvcnQgRGF0YUNvbnRleHQgZnJvbSBcIi4uL0RhdGFDb250ZXh0XCJcclxuXHJcbmNvbnN0IEhvbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgeyBhcHBDYXRlZ29yaWVzIH0gPSB1c2VDb250ZXh0KERhdGFDb250ZXh0KVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPENvbnRhaW5lcj5cclxuICAgICAgPEhlcm8+XHJcbiAgICAgICAgRXZlcnkgYXBwLCBldmVyeSBzaG9ydGN1dCwgPGI+dGhlIGJlc3Qgb25lcyBmaXJzdC48L2I+XHJcbiAgICAgIDwvSGVybz5cclxuICAgICAgPEdyaWRDb250YWluZXI+XHJcbiAgICAgICAge2FwcENhdGVnb3JpZXMubWFwKGFwcENhdGVnb3J5ID0+IChcclxuICAgICAgICAgIDxBcHBMaXN0IGtleT17YXBwQ2F0ZWdvcnkuZ3JpZEFyZWF9IHsuLi5hcHBDYXRlZ29yeX0gLz5cclxuICAgICAgICApKX1cclxuICAgICAgPC9HcmlkQ29udGFpbmVyPlxyXG4gICAgPC9Db250YWluZXI+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb21lXHJcblxyXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxyXG4gIG1heC13aWR0aDogMTAyNHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG5gXHJcblxyXG5jb25zdCBHcmlkQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtZ2FwOiA2MHB4O1xyXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XHJcbiAgICBcIm9zIGJyb3dzZXJzIGJyb3dzZXJzXCJcclxuICAgIFwiY29kaW5nIGNvZGluZyBjb2RpbmdcIlxyXG4gICAgXCJjYXN1YWwgY2FzdWFsIGNhc3VhbFwiXHJcbiAgICBcImdyYXBoaWNzIGdyYXBoaWNzIGdyYXBoaWNzXCJcclxuICAgIFwib2ZmaWNlIG9mZmljZSBvZmZpY2VcIjtcclxuXHJcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDk5cHgpIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6XHJcbiAgICAgIFwib3NcIlxyXG4gICAgICBcImJyb3dzZXJzXCJcclxuICAgICAgXCJjb2RpbmdcIlxyXG4gICAgICBcImNhc3VhbFwiXHJcbiAgICAgIFwiZ3JhcGhpY3NcIlxyXG4gICAgICBcIm9mZmljZVwiO1xyXG4gIH1cclxuYFxyXG5cclxuY29uc3QgSGVybyA9IHN0eWxlZC5oMWBcclxuICBjb2xvcjogI2ZmZmZmZjtcclxuICBmb250LXNpemU6IDUwcHg7XHJcbiAgbWFyZ2luLXRvcDogMTUwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTkwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNWVtO1xyXG5cclxuICAmIGIge1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICB9XHJcblxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA5OTJweCkge1xyXG4gICAgbWFyZ2luLXRvcDogNTBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDcwcHg7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgfVxyXG5gXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/client/pages/Home.js\n");

/***/ })

};