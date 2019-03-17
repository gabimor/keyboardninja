import Layout from "./layout/Layout"
import styled from "@emotion/styled"

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
  font-size: 40px;
  color: #e86562;
  margin: 100px 0 10px;
`

const Message = styled.div`
  margin-bottom: 10px;
`

const Code = styled.span`
  color: #ffffff;
`

const Container = styled.div`
  text-align: center;
`

export default About
