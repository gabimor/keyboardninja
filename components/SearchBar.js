import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { actionTypes } from "../store"
import { colors } from "../pages/layout"
import SearchAppInput from "./SearchAppInput"

class SearchBar extends Component {
  onNew = name => this.props.suggestApp(name)

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
function mapDispatchToProps(dispatch) {
  return {
    suggestApp(name) {
      dispatch({ type: actionTypes.SUGGEST_APP, name })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)

const Container = styled.div`
  display: flex;
  background: ${colors.darkRed};
  padding: 20px 30px;
  margin-bottom: 30px;
`

const Label = styled.label`
  padding: 11px 15px 0 0;
  color: ${colors.panelZebra};
  font-weight: 300;
  font-size: 20px;
`
