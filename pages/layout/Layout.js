import styled from "styled-components"

import Header from "./Header"
import Footer from "./Footer"
import GlobalStyle from "./GlobalStyle"

const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
`

export default ({ children }) => (
  <>
    <GlobalStyle />
    <Header />
    <Container>{children}</Container>
    <Footer />
  </>
)
