/* eslint-disable import/first */
import React from "react"; // eslint-disable-line no-unused-vars
import { StaticRouter } from "react-router-dom";
import { renderToString, renderToNodeStream } from "react-dom/server";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import flash from "connect-flash";
import session from "express-session";
import express from "express";
import compression from "compression";
import dotenv from "dotenv";

const RedisStore = require("connect-redis")(session);

dotenv.config();

import * as cache from "./server_old/cache";
import Layout from "../src/client/Layout";
import DataContext from "../src/client/DataContext";
import { page, pageStart, pageEnd } from "./server_old/page";
import "../src/server/api/auth";
import api from "../src/server/api/api";
import { UserShortcut } from "./server_old/models";

const app = express();

const router = express.Router();

app.disable("x-powered-by");

app.use(
  session({
    store: new RedisStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000, secure: false },
  })
);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use("/api", api);
app.use("/", router);

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

app.get("/404", defaultHandler);
app.get("/login", defaultHandler);
app.get("/signup", defaultHandler);
app.get("/contact", defaultHandler);

app.get("/:name", async (req, res, next) => {
  try {
    const appsHash = await cache.getAppsHash();
    const foundApp = appsHash.find((e) => e.name === req.params.name);

    if (!foundApp) return res.redirect("/404");

    const appId = foundApp.id;

    let app = await cache.getApp(appId);

    let { os } = req.cookies;

    if (!os) {
      os = req.headers["user-agent"].toLowerCase().includes("win")
        ? "win"
        : "mac";
    }
    // if app doesn't support the detected os, switch os to the one that's supported
    if (!app.oss.includes(os)) {
      os = app.oss[0];
    }

    if (req.query.h) {
      try {
        const userShortcuts = await UserShortcut.findById(req.query.h);

        // TODO: replace with production solution
        app = JSON.parse(JSON.stringify(app));

        if (userShortcuts && userShortcuts.appId.toString() === appId) {
          for (const shortcutId of userShortcuts.shortcuts) {
            app.shortcuts.find(
              (e) => e._id.toString() === shortcutId.toString()
            ).isPinned = true;
          }
        }
      } catch (error) {
        console.log(req.path);
        console.log(error.toString());
        // res.redirect(req.path)
      }
    }

    // if (req.user) {
    //   const userShortcuts = await UserShortcut.findOne({
    //     userId: req.user.id,
    //     appId: app._id,
    //   })
    //   if (userShortcuts) {
    //     for (const shortcutId of userShortcuts.shortcuts) {
    //       app.shortcuts.find(
    //         e => e._id.toString() === shortcutId.toString()
    //       ).isPinned = true
    //     }
    //   }
    // }

    const appCategories = await cache.getAppCategories();
    const dataContext = { app, os, appCategories };

    sendPage(req, res, dataContext, app.name + " keyboard shortcuts");
  } catch (err) {
    next(err);
  }
});

app.get("/", defaultHandler);

async function defaultHandler(req, res, next) {
  try {
    const appCategories = await cache.getAppCategories();

    const dataContext = {
      appCategories,
      user: req.user,
    };

    sendPage(req, res, dataContext);
  } catch (err) {
    next(err);
  }
}

app.use(function errorHandler(err, req, res, next) {
  res.status(500);
  res.send(err.toString() + err.stack);
});

const getTemplate = (url, dataContext) => (
  <DataContext.Provider value={dataContext}>
    <StaticRouter context={{}} location={url}>
      <Layout />
    </StaticRouter>
  </DataContext.Provider>
);

const sendPage = (req, res, dataContext, title) => {
  const canonicalUrl = req.url.split("?")[0];
  const markup = renderToString(getTemplate(req.url, dataContext));
  const pageMarkup = page(markup, title, assets, dataContext, canonicalUrl);
  res.status(200).send(pageMarkup);
};

export default app;