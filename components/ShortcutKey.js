import React from 'react'

import styled from 'styled-components'
import { colors } from '../components/GlobalStyle'

const Container = styled('span')`
  display: inline-block;
  background-color: ${colors.red};
  color: ${colors.white};

  font-size: 14px;
  padding: 1px 5px 0px;
  border: solid 1px ${colors.darkRed};
  border-radius: 6px;
  margin: 0 2px;
`

export default function ShortcutKey({ children }) {
  return <Container>{children}</Container>
}
