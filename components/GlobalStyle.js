import { createGlobalStyle  } from "styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background: #f4f5fa;
    color:black;
    
    margin:0;
    font-family:open sans, arial;
  }

  a {
    color:black;
    
    text-decoration:none;
  }
  
  input, textarea, select {
    font-size:inherit;
  }

  input:focus,  textarea:focus,  select:focus,
  input:active, textarea:active, select:active {
    outline: 0;
  }
  
  h1,h2,h3,h4,h5,h6 {
    margin:0;
    font-weight: normal;
  }

  // --------------------------------------------------------

  .react-autosuggest__container {
    position: relative;
  }
  
  .react-autosuggest__input {
    width: 350px;
    // height: 30px;
    // padding: 10px 20px;
    // font-family: Helvetica, sans-serif;
    font-weight: 300;
    // font-size: 16px;
    // border: 1px solid #aaa;
    // border-radius: 4px;
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
    top: 51px;
    width: 350px;
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    max-height: 100px;
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
  
  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`
export default GlobalStyle
