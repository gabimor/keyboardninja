import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "."

const Container = styled.span`
  margin-left: auto;
  font-size: 30px;
  cursor: pointer;
`

class OSSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      os: props.os,
    }
  }

  getColor = os =>
    os === this.state.os ? colors.white : colors.deactivatedGray

  render() {
    return (
      <Container>
        <i
          className="fab fa-windows"
          style={{ color: this.getColor("win") }}
          onClick={() => this.setState({ os: "win" })}
        />
        <i
          className="fab fa-apple"
          style={{ color: this.getColor("osx"), paddingLeft:20}}
          onClick={() => this.setState({ os: "osx" })}
        />
      </Container>
    )
  }
}

OSSelect.propTypes = {
  os: PropTypes.string.isRequired
}

export default OSSelect