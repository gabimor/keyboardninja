import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "."

import { loadOS, saveOS } from "../../helpers/localStorage"
import { getClientOS } from "../../helpers"

class OSSelect extends Component {
  constructor(props) {
    super()

    this.state = {}
  }

  componentDidMount() {
    if (!this.state.os) {
      let os = loadOS()
      if (!os) {
        os = getClientOS()
        saveOS(os)
      }
      this.setState({ os })
    }
  }

  handleSelect(os) {
    this.setState({ os })
    saveOS(os)
    this.props.onSelect(os)
  }

  getColor = os =>
    this.state.os && os === this.state.os
      ? colors.white
      : colors.deactivatedGray

  render() {
    return (
      <Container>
        <i
          className="fab fa-windows"
          style={{ color: this.getColor("win") }}
          onClick={() => this.handleSelect("win")}
        />
        <i
          className="fab fa-apple"
          style={{ color: this.getColor("osx"), paddingLeft: 20 }}
          onClick={() => this.handleSelect("osx")}
        />
      </Container>
    )
  }
}
export default OSSelect

const Container = styled.span`
  margin-left: auto;
  font-size: 30px;
  cursor: pointer;
`
