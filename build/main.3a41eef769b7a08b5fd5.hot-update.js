exports.id = "main";
exports.modules = {

/***/ "./src/server/page.js":
/*!****************************!*\
  !*** ./src/server/page.js ***!
  \****************************/
/*! exports provided: style, page, pageStart, pageEnd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "style", function() { return style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "page", function() { return page; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageStart", function() { return pageStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageEnd", function() { return pageEnd; });
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);

// /*
//   #a12d2a - shortcuts titles
//   #D1403D - darkRed
//   #E86562 - red, links
//   #fa9290 - links
//   #5A5A5A - mutedIcon
//   #9D8B8B - labelText, pinBorder
//   #A4A3A6 - pin
//   #d1b4b4 - textRed
//   #d1d0d4 - soon text
//   #E9E5E5 - softText

//   #ffe6ab - pinSelected

//   #FFFFFF - white
//   #4F4242 - appPanel
//   #453A3A - darkBorder
//   #442323 - mainBG1
//   #270505 - mainBG2
//   #2C2525 - panelZebra
//   #2E2424 - panel
//   #000000 - black
// */

var style = "<style>\n* {\n  box-sizing: border-box;\n}\nhtml {\n  height:100%;\n  background-color: #270505;\n}\n\nbody {\n  background: linear-gradient(#442323, #270505) no-repeat;    \n  background-size: 100% 400px;\n  color: #FFFFFF;\n  margin: 0;\n  font-family: \"IBM Plex Sans\", sans-serif;\n  font-size: 14px;\n  min-height: 500px;\n}\n\ninput, textarea, select, button {\n  font-family: inherit;\n  font-size: inherit;\n  border: none;\n  box-sizing: border-box;\n}\n\ninput:focus, textarea:focus, select:focus, div:focus, button:focus,\ninput:active, textarea:active, select:active, div:active, button:active {\n  outline: 0;\n}\n\ninput {\n  padding: 8px 10px 8px;\n  color: #FFFFFF;\n  background: #000000;\n}\n\nkbd {\n  display: inline-block;\n  background-color: #635656;\n  color: #FFFFFF;\n  font-family: inherit;\n\n  font-size: 13px;\n  border: solid 1px #442323;\n  border-radius: 6px;\n  padding: 0 2px;\n  min-width: 32px;\n  text-align: center;\n  box-shadow: 0px 6px 1px 1px rgba(30,30,30,0.2);\n}\n\nlabel {\n  margin-right: 6px;\n  color: #FFFFFF;\n}\n\nul, ul li, ol, ol li {\n  margin: 0;\n  padding: 0;\n  list-style-position: inside;\n}\n\n\nul, ul li {\n  list-style: none;\n}\n\na {\n  color: #fa9290;\n  text-decoration: none;\n  cursor: pointer;\n}\n\nh1,h2,h3,h4,h5,h6 {\n  margin: 0;\n  line-height:1em;\n  font-weight: normal;\n}\n</style>";

function page(markup, title, assets, data) {
  var head = assets.client.css ? "<link rel=\"stylesheet\" href=\"" + assets.client.css + "\">" : "";
  head +=  false ? undefined : "<script src=\"" + assets.client.js + "\" defer crossorigin></script>";

  return "<!doctype html>\n    <html lang=\"\">\n    <head>\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n      <meta charset=\"utf-8\" />\n      <title>" + (title || "Keyboard Ninja Me") + "</title>\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n      <link\n        href=\"https://use.fontawesome.com/releases/v5.4.2/css/all.css\"\n        integrity=\"sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns\"\n        crossOrigin=\"anonymous\"\n        rel=\"stylesheet\" />\n      <link\n        href=\"https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i\"\n        rel=\"stylesheet\" />\n\n      " + style + "\n      " + (head || "") + "\n    </head>\n    <body>\n      <script>\n        window.__KBN_DATA__ = " + (data ? babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(data) : undefined) + ";\n      </script>\n      <div id=\"root\">" + markup + "</div>\n    </body>\n    </html>";
}

function pageStart(title, assets, data) {
  var head = assets.client.css ? "<link rel=\"stylesheet\" href=\"" + assets.client.css + "\">" : "";
  head +=  false ? undefined : "<script src=\"" + assets.client.js + "\" defer crossorigin></script>";

  return "<!doctype html>\n    <html lang=\"\">\n    <head>\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n      <meta charset=\"utf-8\" />\n      <title>" + (title || "Keyboard Ninja Me") + "</title>\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n      <link\n        href=\"https://use.fontawesome.com/releases/v5.4.2/css/all.css\"\n        integrity=\"sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns\"\n        crossOrigin=\"anonymous\"\n        rel=\"stylesheet\" />\n      <link\n        href=\"https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i\"\n        rel=\"stylesheet\" />\n      " + style + "\n      " + (head || "") + "\n    </head>\n    <body>\n      <script>\n        window.__KBN_DATA__ = " + (data ? babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(data) : undefined) + ";\n      </script>\n      <div id=\"root\">";
}

function pageEnd() {
  return "</div></body></html>";
}

var tracking = "\n  <!-- Hotjar Tracking Code for http://www.keyboardninja.me -->\n  <script>\n      (function(h,o,t,j,a,r){\n          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n          h._hjSettings={hjid:1186459,hjsv:6};\n          a=o.getElementsByTagName('head')[0];\n          r=o.createElement('script');r.async=1;\n          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n          a.appendChild(r);\n      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');\n  </script>\n  <!-- Global site tag (gtag.js) - Google Analytics -->\n  <script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-90675788-2\"></script>\n  <script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    gtag('js', new Date());\n\n    gtag('config', 'UA-90675788-2');\n  </script>";

/***/ })

};
//# sourceMappingURL=main.3a41eef769b7a08b5fd5.hot-update.js.map