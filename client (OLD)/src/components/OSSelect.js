import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  margin-left:auto;

  & i {
    padding:10px;
  }
`

function OSSelect () {
  return (
    <Container>
      <i className="fab fa-windows"></i>
      <i className="fab fa-apple"></i>
    </Container>
  )
}

export default OSSelect