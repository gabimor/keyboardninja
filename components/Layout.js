import styled from 'styled-components'

import Header from './Header'
import Footer from './Footer'
import GlobalStyle from './GlobalStyle'

const MainContainer = styled.div`
  max-width: 1160px;
  margin: 0 auto;
`

export default ({ children }) => (
  <>
    <GlobalStyle />
    <Header />
    <MainContainer>{children}</MainContainer>
    <Footer />
  </>
)
