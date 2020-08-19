/* eslint-disable no-console */
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), doWork);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function doWork(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  const appName = process.argv[2];

  const sheetObj = {
    spreadsheetId: "1b-Apeea9rBt6E4QG6Drzx_YQJmyxwKh9vjL8Ma6b1os",
    range: `${appName}!A:F`,
  };

  sheets.spreadsheets.values.get(sheetObj, (err, res) => {
    if (err) return console.log("The API returned an error: " + err);
    const rows = res.data.values;
    const appParams = rows[0];
    const app = {
      name: appParams[0],
      oss: [appParams[1]],
    };
    if (appParams[2]) app.oss.push(appParams[2]);
    app.icon = encodeAppName(app.name) + ".png";

    rows.shift();
    if (rows.length) {
      addApp(app.name, app.icon, app.oss, rows);
    } else {
      console.log("No data found.");
    }
  });
}

// ---------- my code ------------

function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-");
}

mongoose.connect(
  "mongodb+srv://gabimor:FNUFkpU2p1opumqZ@cluster0-li1ur.mongodb.net/keyboard_ninja?retryWrites=true",
  {
    useNewUrlParser: true,
  }
);

async function addApp(name, icon, oss, shortcuts) {
  const appData = { name, icon, oss, sections: [], shortcuts: [] };

  let sectionId;
  for (const shortcutRow of shortcuts) {
    console.log(shortcutRow);
    if (shortcutRow[0][0] === "#") {
      const sectionName = shortcutRow[0].substr(1).trim();
      sectionId = mongoose.Types.ObjectId();

      appData.sections.push({ _id: sectionId, name: sectionName });
    } else {
      const isHtml = !!shortcutRow[3];
      const note = shortcutRow[4];
      const shortcut = { sectionId };
      if (isHtml) shortcut.isHtml = isHtml;
      if (note) shortcut.note = note;

      shortcut.action = shortcutRow[0].trim();
      shortcut[oss[0]] = shortcutRow[1] ? shortcutRow[1].trim() : "";
      if (oss[1]) {
        shortcut[oss[1]] = shortcutRow[2] ? shortcutRow[2].trim() : "";
      }

      appData.shortcuts.push(shortcut);
    }
  }

  console.log(appData);
  App.deleteOne({ name: appData.name }, () => {});
  const app = new App(appData);
  app.save(() => process.exit(0));
}

const App = mongoose.model(
  "apps",
  new Schema({
    name: String,
    icon: String,
    sections: [
      new Schema({
        name: String,
      }),
    ],
    oss: [String],
    shortcuts: [
      new Schema({
        action: String,
        sectionId: Schema.ObjectId,
        win: String,
        mac: String,
        isHtml: Boolean,
        note: String,
      }),
    ],
  })
);
