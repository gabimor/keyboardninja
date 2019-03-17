import React from "react"
import styled from "@emotion/styled"

import OSSelect from "./OSSelect"
// import Input from "../../components/Input"

const Controls = ({ icon, name }) => (
  <Container>
    <Icon src={"/static/logos/" + icon} />
    <Text>{name}</Text>
    <SearchWrapper>
      Show: All, My Shortcuts | Grouped, Ungrouped
      {/* <Input />
          <SearchIcon className="fas fa-search" /> */}
    </SearchWrapper>
    <OSSelect />
  </Container>
)

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

const SearchIcon = styled.i`
  position: absolute;
  right: 10px;
  top: 7px;
  color: #5a5a5a;
  font-size: 20px;
`
