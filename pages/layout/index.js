import { createGlobalStyle } from "styled-components"

export const colors = {
  darkRed: "#D1403D",
  red: "#E86562",
  textRed: "#d1b4b4",

  mainBG1: "#442323",
  mainBG2: "#270505",

  darkBorder: "#453A3A",

  mutedIcon: "#5A5A5A",
  softText: "#E9E5E5",
  labelText: "#9D8B8B", // pinBorder
  pin: "#A4A3A6",
  pinSelected: "#FFD46F",
  pinSelectedBorder: "#A57E26",

  white: "#FFFFFF",
  black: "#000000",
  appPanel: "#4F4242",
  panel: "#2E2424",  
  panelZebra: "#2C2525",
}

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    height:100%;
    background-color: ${colors.mainBG2};
  }

  body {
    background: linear-gradient(${colors.mainBG1}, ${colors.mainBG2}) no-repeat;    
    background-size: 100% 400px;
    color: ${colors.white}
    margin: 0;
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 16px;
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
    color: white;
    background: ${colors.formInputBG};
  }
  
  label {
    margin-right: 6px;
    color: ${colors.lightGray};
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
    color: ${colors.white};
    text-decoration: none;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    line-height:1em;
    font-weight: normal;
  }
`
