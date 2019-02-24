import React, { Component } from "react"
import styled from "styled-components"

import OSSelect from "./OSSelect"
import { colors } from "../layout"

export default class extends Component {
  render() {
    const { icon, name } = this.props
    // const { os, searchText } = this.state

    return (
      <Container>
        <Icon src={"/static/logos/" + icon} />
        <Text>{name}</Text>
        <SearchWrapper>
          show all, just mine, grouped
          <SearchInput />
          <SearchIcon className="fas fa-search" />
        </SearchWrapper>
        <OSSelect />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 60px 0 40px 0;
  border-bottom: solid 1px ${colors.mutedIcon};
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
  color: ${colors.mutedIcon};  
  font-size:20px;
`

const SearchInput = styled.input`
  padding: 6px 36px 6px 6px;
  background: black;
  border: solid 1px ${colors.mutedIcon};
  border-radius: 5px;
`
