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
      <Container>
        <Header />
        <div>{children}</div>
        <Footer />
      </Container>
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
  padding: 0 30px;
`
