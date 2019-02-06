import Layout from "./layout/Layout"
import { colors } from "./layout"
import styled from "styled-components"

const About = () => {
  return (
    <Layout>
      <Container>
        <Header>Oops</Header>
        <Message>Looks like no one's here ..</Message>
        <Code>404</Code>
        
      </Container>
    </Layout>
  )
}

const Header = styled.h1`
  color: ${colors.red};
  margin: 100px 0 10px;
`

const Message = styled.div`
  margin-bottom: 10px;
`

const Code = styled.span`
  color: ${colors.formInputBG};
`

const Container = styled.div`
  text-align: center;
`

export default About
