import styled from "styled-components"

import Header from "./Header"
import Footer from "./Footer"
import Theme from "."

const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
`

export default ({ children }) => (
  <>
    <Theme />
    <Header />
    <Container>{children}</Container>
    <Footer />
  </>
)
