import React, { useContext } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

import DataContext from "../../DataContext"
import OSSelect from "./OSSelect"

const Controls = ({ icon, name }) => {
  const { os, doSetOs } = useContext(DataContext)

  return (
    <Container>
      <Icon src={"/logos/" + icon} />
      <Text>{name}</Text>
      <SearchWrapper />
      <OSSelect onSelect={doSetOs} os={os} />
    </Container>
  )
}

export default Controls

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 60px 0 40px 0;
  border-bottom: solid 1px #5a5a5a;
`

const Icon = styled.img`
  width: 50px;
`

const Text = styled.h1`
  font-size: 40px;
  margin-left: 20px;
  font-weight: 200;
`

const SearchWrapper = styled.div`
  position: relative;
  margin-right: 20px;
  margin-left: auto;
`
