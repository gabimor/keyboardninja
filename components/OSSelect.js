import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;

  & i {
    padding: 10px;
  }
`

function OSSelect() {
  return (
    <Container>
      <i className="fab fa-windows" />
      <i className="fab fa-apple" />
    </Container>
  )
}

export default OSSelect
