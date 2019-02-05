import React from "react"

import styled from "styled-components"
import PropTypes from "prop-types"

import { upperFirstLetter } from "../../helpers"
import Shortcut from "./Shortcut"
import { colors } from "../layout"

function ShortcutItem({ action, keys, isPinned }) {
  return (
    <Container>
      <td>
        <i className="fas fa-thumbtack" />
      </td>
      <td>{upperFirstLetter(action)}</td>
      <td>
        <Shortcut keys={keys} />
      </td>
    </Container>
  )
}

ShortcutItem.propTypes = {
  action: PropTypes.string.isRequired,
  keys: PropTypes.array.isRequired,
}

export default ShortcutItem

const Container = styled.tr`
  padding: 10px 30px;
  background: ${colors.panelGray};

  color: ${colors.mainBG}};
  & td {
    padding: 6px 10px;
  }
`
