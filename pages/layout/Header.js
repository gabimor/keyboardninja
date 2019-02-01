import React from "react"

import Logo from "./Logo"
import Nav from "./Nav"
import OSSelect from "./OSSelect";


export default () => (
  <div>
    <Logo />    
    <Nav/>
    <OSSelect os="win"/>    
  </div>
)
