import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { connect } from "react-redux"

import { actionTypes } from "../../store"
import Logo from "./Logo"
import Nav from "./Nav"
import OSSelect from "./OSSelect"

function Header({ os, doSetOS }) {
  return (
    <Container>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <Nav />
      <OSSelect os={os} onSelect={doSetOS} />
    </Container>
  )
}

function mapStateToProps(state) {
  // const { os } = state
  // return { os }
}

function mapDispatchToProps(dispatch) {
  return {
    doSetOS(os) {
      dispatch({ type: actionTypes.SET_OS, os })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

const Container = styled.div`
  display: flex;
  align-items: baseline;
  padding: 26px 36px 36px 30px;
`
