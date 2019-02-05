import styled from "styled-components"
import { connect } from "react-redux"

import Header from "./Header"
import Footer from "./Footer"
import Theme from "."
import Overlay from "./Overlay"

function Layout({ children, overlay }) {
  return (
    <>
      <Theme />
      {overlay && <Overlay />}
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}

function mapStateToProps(state) {
  const { overlay } = state
  return { overlay }
}

export default connect(mapStateToProps)(Layout)

const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
`
