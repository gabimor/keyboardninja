import { modalStyle } from "@client/components/Modal";

export const backgroundGradientStartColor = "#442323";
export const backgroundGradientEndColor = "#270505";

export const style = `
* {
  box-sizing: border-box;
}
html {
  height:100%;
  background-color: #270505;
}

body {
  background: linear-gradient(${backgroundGradientStartColor}, ${backgroundGradientEndColor}) no-repeat;
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

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px #261d1d inset !important;
}

input:-webkit-autofill {
  -webkit-text-fill-color: #e9e5e5 !important;
}

input {
  padding: 8px 10px 8px;
}

kbd {
  display: inline-block;
  background-color: #D1403D;
  color: #FFFFFF;
  font-family: inherit;m
  font-size: 13px;
  text-align: center;
  padding: 1px 5px;
  border: solid 1px #442323;
  border-radius: 6px;
  min-width: 32px;
  box-shadow: 0px 6px 1px 1px rgba(30,30,30,0.2);
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

// *************************
// Animation classes
// *************************

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: all 200ms;
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: all 200ms;
}


.slide-down-enter {
  opacity: 0;
  transform: translate(0, -20px)
}
.slide-down-enter-active {
  opacity: 1;
  transition: all 200ms ease-in-out;
  transform: translate(0, 0px)
}
.slide-down-exit {
  opacity: 0;
}
.slide-down-exit-active {
  opacity: 0;
  transition: all 200ms ease-in-out;
  transform: translate(0, -20px)
}


.delayed-fade-enter {
  opacity: 0;
}
.delayed-fade-enter-active {
  opacity: 1;
  transition-delay:300ms;
  transition: all 1000ms;
}
.delayed-fade-exit {
  opacity: 1;
}
.delayed-fade-exit-active {
  opacity: 0;
  transition-delay:300ms;
  transition: all 1000ms;
}

${modalStyle}
`;
