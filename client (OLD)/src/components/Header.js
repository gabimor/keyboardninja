import React from 'react'
import styled from '@emotion/styled'

import { Link } from 'react-router-dom'

const Container = styled.header`
  background:#8763d3;
  color:white;
  padding:20px;  
  margin-bottom:20px;
`

function Header () { return (
  <Container>
    <Link to="/">Keyboard Ninja</Link> &nbsp;
    <Link to="/edit">Edit</Link> &nbsp;
    <Link to="/apps">Apps</Link> &nbsp;
    <Link to="/about">About</Link>
  </Container>
)}

export default Header
