export default (markup, title, assets, data) => {
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
      ${head || ""}
    </head>
    <body>
      <div id="root">${markup}</div>
    </body>
    <script>
      window.__KBN_DATA__ = ${data ? JSON.stringify(data) : undefined};
    </script>
    </html>`
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
