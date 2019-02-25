import { createGlobalStyle } from "styled-components"

/*
  #a12d2a - shortcuts titles
  #D1403D - darkRed
  #E86562 - red
  #5A5A5A - mutedIcon
  #9D8B8B - labelText, pinBorder
  #A4A3A6 - pin
  #d1b4b4 - textRed
  #E9E5E5 - softText  

  #FFD46F - pinSelected
  #A57E26 - pinSelectedBorder

  #FFFFFF - white
  #000000 - black
  #4F4242 - appPanel
  #453A3A - darkBorder
  #2E2424 - panel
  #2C2525 - panelZebra
  #442323 - mainBG1
  #270505 - mainBG2
*/

export default createGlobalStyle`
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
    color: #FFFFFF;
    background: #000000;
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
    color: #FFFFFF;
    text-decoration: none;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    line-height:1em;
    font-weight: normal;
  }
`
