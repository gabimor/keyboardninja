export const style = `
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
  box-sizing: border-box;
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
`;
