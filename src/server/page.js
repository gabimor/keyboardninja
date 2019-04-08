// /*
//   #a12d2a - shortcuts titles
//   #D1403D - darkRed
//   #E86562 - red, links
//   #fa9290 - links
//   #5A5A5A - mutedIcon
//   #9D8B8B - labelText, pinBorder
//   #A4A3A6 - pin
//   #d1b4b4 - textRed
//   #E9E5E5 - softText

//   #FFD46F - pinSelected
//   #A57E26 - pinSelectedBorder

//   #FFFFFF - white
//   #4F4242 - appPanel
//   #453A3A - darkBorder
//   #442323 - mainBG1
//   #270505 - mainBG2
//   #2C2525 - panelZebra
//   #2E2424 - panel
//   #000000 - black
// */

export const style = `<style>
* {
  box-sizing: border-box;
}
html {
  height:100%;
  background-color: #270505;
}

body {
  background: linear-gradient(#442323, #270505) no-repeat;    
  background-size: 100% 400px;
  color: #FFFFFF;
  margin: 0;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 14px;
  min-height: 500px;
}

input, textarea, select, button {
  font-family: inherit;
  font-size: inherit;
  border: none;
}

input:focus, textarea:focus, select:focus, div:focus, button:focus,
input:active, textarea:active, select:active, div:active, button:active {
  outline: 0;
}

input {
  padding: 8px 10px 8px;
  color: #FFFFFF;
  background: #000000;
}

kbd {
  display: inline-block;
  background-color: #635656;
  color: #FFFFFF;
  font-family: inherit;

  font-size: 13px;
  border: solid 1px #442323;
  border-radius: 6px;
  padding: 0 2px;
  margin: 0 2px;
  min-width: 32px;
  text-align: center;
  box-shadow: 0px 6px 1px 1px rgba(30,30,30,0.2);
}

label {
  margin-right: 6px;
  color: #FFFFFF;
}

ul, ul li, ol, ol li {
  margin: 0;
  padding: 0;
  list-style-position: inside;
}


ul, ul li {
  list-style: none;
}

a {
  color: #fa9290;
  text-decoration: none;
  cursor: pointer;
}

h1,h2,h3,h4,h5,h6 {
  margin: 0;
  line-height:1em;
  font-weight: normal;
}
</style>`

export function page(markup, title, assets, data) {
  let head = assets.client.css
    ? `<link rel="stylesheet" href="${assets.client.css}">`
    : ""
  head +=
    process.env.NODE_ENV === "production"
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`

  return `<!doctype html>
    <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>${title || "Keyboard Ninja Me"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link
        href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"
        integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns"
        crossOrigin="anonymous"
        rel="stylesheet" />
      <link
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet" />

      ${style}
      ${head || ""}
    </head>
    <body>
      <script>
        window.__KBN_DATA__ = ${data ? JSON.stringify(data) : undefined};
      </script>
      <div id="root">${markup}</div>
    </body>
    </html>`
}

export function pageStart(title, assets, data) {
  let head = assets.client.css
    ? `<link rel="stylesheet" href="${assets.client.css}">`
    : ""
  head +=
    process.env.NODE_ENV === "production"
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`

  return `<!doctype html>
    <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>${title || "Keyboard Ninja Me"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link
        href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"
        integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns"
        crossOrigin="anonymous"
        rel="stylesheet" />
      <link
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet" />
      ${style}
      ${head || ""}
    </head>
    <body>
      <script>
        window.__KBN_DATA__ = ${data ? JSON.stringify(data) : undefined};
      </script>
      <div id="root">`
}

export function pageEnd() {
  return "</div></body></html>"
}
// <!-- Hotjar Tracking Code for http://www.keyboardninja.me -->
// <script>
//     (function(h,o,t,j,a,r){
//         h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
//         h._hjSettings={hjid:1186459,hjsv:6};
//         a=o.getElementsByTagName('head')[0];
//         r=o.createElement('script');r.async=1;
//         r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
//         a.appendChild(r);
//     })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
// </script>
// <!-- Global site tag (gtag.js) - Google Analytics -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=UA-90675788-2"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'UA-90675788-2');
// </script>
