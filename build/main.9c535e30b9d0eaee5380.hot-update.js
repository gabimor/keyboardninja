exports.id = "main";
exports.modules = {

/***/ "./src/client/components/AppList.js":
/*!******************************************!*\
  !*** ./src/client/components/AppList.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AppList; });\n/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ \"babel-runtime/helpers/taggedTemplateLiteral\");\n/* harmony import */ var babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ \"@emotion/styled\");\n/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ \"./src/client/helpers/index.js\");\n/* harmony import */ var _AppItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AppItem */ \"./src/client/components/AppItem.js\");\n\nvar _jsxFileName = \"C:\\\\MyStull\\\\Code\\\\keyboardninja\\\\src\\\\client\\\\components\\\\AppList.js\";\n\nvar _templateObject = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  background: #2c2525;\\n  grid-area: \", \";\\n  padding: 20px;\\n\\n  @media (max-width: 992px) {\\n    padding: 15px 10px;\\n  }\\n\\n  @media (max-width: 767px) {\\n    padding: 10px 6px;\\n  }\\n\"], [\"\\n  background: #2c2525;\\n  grid-area: \", \";\\n  padding: 20px;\\n\\n  @media (max-width: 992px) {\\n    padding: 15px 10px;\\n  }\\n\\n  @media (max-width: 767px) {\\n    padding: 10px 6px;\\n  }\\n\"]),\n    _templateObject2 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  display: grid;\\n  grid-template-columns: repeat(7, 1fr);\\n  grid-gap: 10px;\\n  --appItemSize: 132px;\\n\\n  \\n  @media (max-width: 1024px) {\\n    --appItemSize: 120px;\\n  }\\n\\n  @media (max-width: 992px) {\\n    --appItemSize: 113px;\\n  }\\n\\n  @media (max-width: 880px) {\\n    --appItemSize: 120px;\\n  }\\n\\n  @media (max-width: 768px) {\\n    grid-template-columns: repeat(5, 1fr);\\n    --appItemSize: 137px;\\n  }\\n\\n  @media (max-width: 650px) {\\n    --appItemSize: 130px;\\n  }\\n\\n  @media (max-width: 550px) {\\n    grid-template-columns: repeat(4, 1fr);\\n    --appItemSize: 123px;\\n  }\\n\\n\\n  @media (max-width: 414px) {\\n    grid-template-columns: repeat(3, 1fr);\\n    --appItemSize: 119px;\\n  }\\n\\n  @media (max-width: 375px) {\\n    --appItemSize: 106px;\\n  }\\n\"], [\"\\n  display: grid;\\n  grid-template-columns: repeat(7, 1fr);\\n  grid-gap: 10px;\\n  --appItemSize: 132px;\\n\\n  \\n  @media (max-width: 1024px) {\\n    --appItemSize: 120px;\\n  }\\n\\n  @media (max-width: 992px) {\\n    --appItemSize: 113px;\\n  }\\n\\n  @media (max-width: 880px) {\\n    --appItemSize: 120px;\\n  }\\n\\n  @media (max-width: 768px) {\\n    grid-template-columns: repeat(5, 1fr);\\n    --appItemSize: 137px;\\n  }\\n\\n  @media (max-width: 650px) {\\n    --appItemSize: 130px;\\n  }\\n\\n  @media (max-width: 550px) {\\n    grid-template-columns: repeat(4, 1fr);\\n    --appItemSize: 123px;\\n  }\\n\\n\\n  @media (max-width: 414px) {\\n    grid-template-columns: repeat(3, 1fr);\\n    --appItemSize: 119px;\\n  }\\n\\n  @media (max-width: 375px) {\\n    --appItemSize: 106px;\\n  }\\n\"]),\n    _templateObject3 = babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  color: #e9e5e5;\\n  font-weight: 400;\\n  font-size: 16px;\\n  margin-bottom: 15px;\\n  margin-left: 5px;\\n\"], [\"\\n  color: #e9e5e5;\\n  font-weight: 400;\\n  font-size: 16px;\\n  margin-bottom: 15px;\\n  margin-left: 5px;\\n\"]);\n\n // eslint-disable-line no-unused-vars\n\n\n\n\n\nfunction AppList(_ref) {\n  var name = _ref.name,\n      apps = _ref.apps,\n      gridArea = _ref.gridArea;\n\n  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\n    Container,\n    { gridArea: gridArea, __source: {\n        fileName: _jsxFileName,\n        lineNumber: 9\n      }\n    },\n    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\n      Header,\n      {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 10\n        }\n      },\n      name\n    ),\n    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\n      InnerContainer,\n      { className: gridArea, __source: {\n          fileName: _jsxFileName,\n          lineNumber: 11\n        }\n      },\n      apps.map(function (app) {\n        var encodedName = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__[\"encodeAppName\"])(app.name);\n        var CurrItem = function CurrItem() {\n          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AppItem__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n            icon: \"/logos/\" + encodedName + \".png\",\n            name: app.name,\n            disabled: app.disabled,\n            __source: {\n              fileName: _jsxFileName,\n              lineNumber: 15\n            }\n          });\n        };\n\n        return app.disabled ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CurrItem, { key: app._id, __source: {\n            fileName: _jsxFileName,\n            lineNumber: 23\n          }\n        }) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\n          \"a\",\n          { href: \"/\" + encodedName, key: app._id, __source: {\n              fileName: _jsxFileName,\n              lineNumber: 25\n            }\n          },\n          react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CurrItem, {\n            __source: {\n              fileName: _jsxFileName,\n              lineNumber: 26\n            }\n          })\n        );\n      })\n    )\n  );\n}\n\nvar Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject, function (props) {\n  return props.gridArea;\n});\n\nvar InnerContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject2);\n\nvar Header = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.h2(_templateObject3);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQXBwTGlzdC5qcz8zM2I2Il0sIm5hbWVzIjpbIkFwcExpc3QiLCJuYW1lIiwiYXBwcyIsImdyaWRBcmVhIiwibWFwIiwiZW5jb2RlZE5hbWUiLCJlbmNvZGVBcHBOYW1lIiwiYXBwIiwiQ3Vyckl0ZW0iLCJkaXNhYmxlZCIsIl9pZCIsIkNvbnRhaW5lciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwiSW5uZXJDb250YWluZXIiLCJIZWFkZXIiLCJoMiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBMEI7QUFDMUI7O0FBRUE7QUFDQTs7QUFFZSxTQUFTQSxPQUFULE9BQTJDO0FBQUEsTUFBeEJDLElBQXdCLFFBQXhCQSxJQUF3QjtBQUFBLE1BQWxCQyxJQUFrQixRQUFsQkEsSUFBa0I7QUFBQSxNQUFaQyxRQUFZLFFBQVpBLFFBQVk7O0FBQ3hELFNBQ0U7QUFBQyxhQUFEO0FBQUEsTUFBVyxVQUFVQSxRQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0U7QUFBQyxZQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQVNGO0FBQVQsS0FERjtBQUVFO0FBQUMsb0JBQUQ7QUFBQSxRQUFnQixXQUFXRSxRQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0dELFdBQUtFLEdBQUwsQ0FBUyxlQUFPO0FBQ2YsWUFBTUMsY0FBY0MsOERBQWFBLENBQUNDLElBQUlOLElBQWxCLENBQXBCO0FBQ0EsWUFBTU8sV0FBVyxTQUFYQSxRQUFXO0FBQUEsaUJBQ2YsMkRBQUMsZ0RBQUQ7QUFDRSxrQkFBTSxZQUFZSCxXQUFaLEdBQTBCLE1BRGxDO0FBRUUsa0JBQU1FLElBQUlOLElBRlo7QUFHRSxzQkFBVU0sSUFBSUUsUUFIaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRGU7QUFBQSxTQUFqQjs7QUFRQSxlQUFPRixJQUFJRSxRQUFKLEdBQ0wsMkRBQUMsUUFBRCxJQUFVLEtBQUtGLElBQUlHLEdBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFESyxHQUdMO0FBQUE7QUFBQSxZQUFHLE1BQU0sTUFBTUwsV0FBZixFQUE0QixLQUFLRSxJQUFJRyxHQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0UscUVBQUMsUUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixTQUhGO0FBT0QsT0FqQkE7QUFESDtBQUZGLEdBREY7QUF5QkQ7O0FBRUQsSUFBTUMsWUFBWUMsc0RBQU1BLENBQUNDLEdBQW5CLGtCQUVTO0FBQUEsU0FBU0MsTUFBTVgsUUFBZjtBQUFBLENBRlQsQ0FBTjs7QUFjQSxJQUFNWSxpQkFBaUJILHNEQUFNQSxDQUFDQyxHQUF4QixrQkFBTjs7QUE0Q0EsSUFBTUcsU0FBU0osc0RBQU1BLENBQUNLLEVBQWhCLGtCQUFOIiwiZmlsZSI6Ii4vc3JjL2NsaWVudC9jb21wb25lbnRzL0FwcExpc3QuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCIgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIlxyXG5cclxuaW1wb3J0IHsgZW5jb2RlQXBwTmFtZSB9IGZyb20gXCIuLi9oZWxwZXJzXCJcclxuaW1wb3J0IEFwcEl0ZW0gZnJvbSBcIi4vQXBwSXRlbVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHBMaXN0KHsgbmFtZSwgYXBwcywgZ3JpZEFyZWEgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8Q29udGFpbmVyIGdyaWRBcmVhPXtncmlkQXJlYX0+XHJcbiAgICAgIDxIZWFkZXI+e25hbWV9PC9IZWFkZXI+XHJcbiAgICAgIDxJbm5lckNvbnRhaW5lciBjbGFzc05hbWU9e2dyaWRBcmVhfT5cclxuICAgICAgICB7YXBwcy5tYXAoYXBwID0+IHtcclxuICAgICAgICAgIGNvbnN0IGVuY29kZWROYW1lID0gZW5jb2RlQXBwTmFtZShhcHAubmFtZSlcclxuICAgICAgICAgIGNvbnN0IEN1cnJJdGVtID0gKCkgPT4gKFxyXG4gICAgICAgICAgICA8QXBwSXRlbVxyXG4gICAgICAgICAgICAgIGljb249e1wiL2xvZ29zL1wiICsgZW5jb2RlZE5hbWUgKyBcIi5wbmdcIn1cclxuICAgICAgICAgICAgICBuYW1lPXthcHAubmFtZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17YXBwLmRpc2FibGVkfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKVxyXG5cclxuICAgICAgICAgIHJldHVybiBhcHAuZGlzYWJsZWQgPyAoXHJcbiAgICAgICAgICAgIDxDdXJySXRlbSBrZXk9e2FwcC5faWR9IC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8YSBocmVmPXtcIi9cIiArIGVuY29kZWROYW1lfSBrZXk9e2FwcC5faWR9PlxyXG4gICAgICAgICAgICAgIDxDdXJySXRlbSAvPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfSl9XHJcbiAgICAgIDwvSW5uZXJDb250YWluZXI+XHJcbiAgICA8L0NvbnRhaW5lcj5cclxuICApXHJcbn1cclxuXHJcbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXHJcbiAgYmFja2dyb3VuZDogIzJjMjUyNTtcclxuICBncmlkLWFyZWE6ICR7cHJvcHMgPT4gcHJvcHMuZ3JpZEFyZWF9O1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcblxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA5OTJweCkge1xyXG4gICAgcGFkZGluZzogMTVweCAxMHB4O1xyXG4gIH1cclxuXHJcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDZweDtcclxuICB9XHJcbmBcclxuXHJcbmNvbnN0IElubmVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XHJcbiAgZ3JpZC1nYXA6IDEwcHg7XHJcbiAgLS1hcHBJdGVtU2l6ZTogMTMycHg7XHJcblxyXG4gIFxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMDI0cHgpIHtcclxuICAgIC0tYXBwSXRlbVNpemU6IDEyMHB4O1xyXG4gIH1cclxuXHJcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDk5MnB4KSB7XHJcbiAgICAtLWFwcEl0ZW1TaXplOiAxMTNweDtcclxuICB9XHJcblxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA4ODBweCkge1xyXG4gICAgLS1hcHBJdGVtU2l6ZTogMTIwcHg7XHJcbiAgfVxyXG5cclxuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XHJcbiAgICAtLWFwcEl0ZW1TaXplOiAxMzdweDtcclxuICB9XHJcblxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA2NTBweCkge1xyXG4gICAgLS1hcHBJdGVtU2l6ZTogMTMwcHg7XHJcbiAgfVxyXG5cclxuICBAbWVkaWEgKG1heC13aWR0aDogNTUwcHgpIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XHJcbiAgICAtLWFwcEl0ZW1TaXplOiAxMjNweDtcclxuICB9XHJcblxyXG5cclxuICBAbWVkaWEgKG1heC13aWR0aDogNDE0cHgpIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XHJcbiAgICAtLWFwcEl0ZW1TaXplOiAxMTlweDtcclxuICB9XHJcblxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAzNzVweCkge1xyXG4gICAgLS1hcHBJdGVtU2l6ZTogMTA2cHg7XHJcbiAgfVxyXG5gXHJcblxyXG5jb25zdCBIZWFkZXIgPSBzdHlsZWQuaDJgXHJcbiAgY29sb3I6ICNlOWU1ZTU7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICBtYXJnaW4tbGVmdDogNXB4O1xyXG5gXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/client/components/AppList.js\n");

/***/ })

};