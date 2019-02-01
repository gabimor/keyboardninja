import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { colors } from "../pages/layout"
import SearchAppInput from "./SearchAppInput"

const Container = styled.div`
  display: flex;
  background: ${colors.darkRed};
  padding: 20px 30px;
`

const Label = styled.label`
  padding: 11px 15px 0 0;
  color: ${colors.panelZebra};
  font-weight: 300;
  font-size: 20px;
  `

class Search extends Component {
  onNew = name => alert(name)

  render() {
    const { onChange, value, apps } = this.props

    return (
      <Container>
        <Label htmlFor="search">Search App:</Label>
        <SearchAppInput
          apps={apps}
          onSelection={onChange}
          onNew={this.onNew}
          value={value}
        />
      </Container>
    )
  }
}

function mapStateToProps(state) {
  const { apps } = state
  return { apps }
}

export default connect(mapStateToProps)(Search)
