import { createGlobalStyle } from "styled-components"

export const colors = {
  darkRed: "#D1403D",
  red: "#E86562",
  lightRed: "#FE9694",

  formBG: "#7F7E80",
  formInputBG: "#A4A3A6",
  mainBG: "#2D0605",

  white: "#FFFFFF",
  panelGray: "#D9D9D9",
  panelZebra: "#E9E5E5",
  deactivatedGray: "#A4A3A6",
}

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background: ${colors.mainBG};    
    color: ${colors.white}
    margin: 0;
    font-family: "Roboto", arial;
  }
  
  input, textarea, select {
    font-size: inherit;
    font-weight: 100;
  }

  input:focus, textarea:focus, select:focus,
  input:active, textarea:active, select:active {
    outline: 0;
  }
  
  ul, ul li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${colors.white};
    text-decoration: none;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    font-weight: normal;
  }

  // --------------------------------------------------------

  .react-autosuggest__container {
    position: relative;
    flex-grow:1;
  }
  
  .react-autosuggest__input {
    width: 100%;
    background: ${colors.red};
    font-size: 25px;
    color: white;
    padding: 10px 20px;
    border: none;
  }
  
  .react-autosuggest__input--focused {
    outline: none;
  }
  
  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .react-autosuggest__suggestions-container {
    display: none;
  }
  
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    width:100%;
    top: 53px;
    background-color: ${colors.red};
    color: ${colors.white};
    font-size: 25px;
    overflow-y: auto;
    z-index: 2;
  }
  
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }
  
  .react-autosuggest__suggestion--companyName {
    color: ${colors.panelGray};
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
  }

  .react-autosuggest__suggestion--highlighted {
    background: ${colors.lightRed};
  }
`
