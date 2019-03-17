import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

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
    this.state.os && os === this.state.os ? "#E9E5E5" : "#5A5A5A"

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
  font-size: 30px;
  cursor: pointer;
  border-left: solid 1px #5a5a5a;
  padding-left: 20px;
`
