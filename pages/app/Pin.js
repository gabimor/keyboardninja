import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

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
    ${props => (props.isPinned ? "#A57E26" : "#9D8B8B")};
  border-radius: 3px;
  padding: 5px 0 3px;
  cursor: pointer;

  :hover i,
  :hover span {
    color: ${props => (props.isPinned ? "#FFD46F" : "#FFFFFF")};
  }

  :hover {
    background: #9d8b8b;
  }
`

const Icon = styled.i`
  color: ${props => (props.isPinned ? "#FFD46F" : "#A4A3A6")};
  font-size: 13px;
  margin-left: 7px;
`

const Count = styled.span`
  font-size: 11px;
  color: ${props => (props.isPinned ? "#FFD46F" : "#E9E5E5")};
  margin: 0 auto;
  padding: 0 6px;
  line-height: 10px;
`
