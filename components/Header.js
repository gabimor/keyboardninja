import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.header`
  background: #8763d3;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
`

export default () => (
  <Container>
    <Link href="/"><a>Keyboard Ninja</a></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Link href="/add"><a>Edit</a></Link> &nbsp;
    <Link href="/apps"><a>Apps</a></Link> &nbsp;
    <Link href="/about"><a>About</a></Link>
  </Container>
)

