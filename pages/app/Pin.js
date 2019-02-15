import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "../layout"

export default function Shortcut({ count, isPinned }) {
  return (
    <Container isPinned={isPinned}>
      <Icon className="fas fa-thumbtack" isPinned={isPinned} />
      <Count isPinned={isPinned}>{count}</Count>
    </Container>
  )
}

Shortcut.propTypes = {
  count: PropTypes.number.isRequired,
  isPinned: PropTypes.bool.isRequired,
}

Shortcut.defaultProps = {
  count: 0,
  isPinned: false,
}

const Container = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: flex-start;
  border: solid 1px
    ${props => (props.isPinned ? colors.pinSelectedBorder : colors.labelText)};
  border-radius: 3px;
  padding: 5px 0 3px;
  cursor: pointer;

  :hover i,
  :hover span {
    color: ${props => (props.isPinned ? colors.pinSelected : colors.white)};
  }

  :hover {
    background: ${colors.labelText};
  }
`

const Icon = styled.i`
  color: ${props => (props.isPinned ? colors.pinSelected : colors.pin)};
  font-size: 13px;
  margin-left: 7px;
`

const Count = styled.span`
  font-size: 11px;
  color: ${props => (props.isPinned ? colors.pinSelected : colors.softText)};
  margin: 0 auto;
  padding: 0 6px;
  line-height: 10px;
`
