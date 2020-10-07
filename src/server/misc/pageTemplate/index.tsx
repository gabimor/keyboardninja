import { style } from "./style";
import { tracking } from "./tracking";
import { IDataContext } from "@client/DataContext";
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export function pageTemplate(
  markup: string,
  title: string,
  dataContext: IDataContext,
  canonicalUrl: string,
  includeJSBundle = true
) {
  const bundleScriptTag = `<script src="${assets.client.js}" defer crossorigin></script>`;

  return `<!doctype html>
    <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta property="og:url"   content="https://www.keyboardninja.me${canonicalUrl}" />
      <meta property="og:image" content="https://www.keyboardninja.me/logo.png" />
      <meta property="og:description" content="Every app, every shortcut. The best ones first." />
      <meta property="og:type" content="website" />
      <meta property="fb:app_id" content="2286973354960672" />
      <meta property="og:title"
        content="keyboardninja.me${title ? " - " + title : ""}" />
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
      <style>${style}</style>
      <link rel="icon" href="logo.svg">
      <link rel=”mask-icon” href=loggo.svg” color=”#270505">
      <link rel="apple-touch-icon" href="logo.png">
      <meta name="theme-color" content="#270505">
      ${includeJSBundle ? bundleScriptTag : ""}
    </head>
    <body>
      <script>
        window.__KBN_DATA__ = ${
          dataContext ? JSON.stringify(dataContext) : undefined
        };
      </script>
      <div id="root">${markup}</div>
      ${tracking}
    </body>
    </html>`;
}